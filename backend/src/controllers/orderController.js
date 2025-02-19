import { StatusCodes } from "http-status-codes";
import * as ordersService from "../services/ordersService.js";
import { ROLES, STATUS_ID_TO_TRANSLATED_NAME, STATUSES, STATUSES_VALUES } from "../utils/constants.js";
import { getWidthAndHeight, replacePlaceholders, splitByComma, toLowerCaseRelations, toUpperCase } from "../utils/functions.js";
import fs from 'fs'
import { JSDOM } from "jsdom";
import ExcelJS from 'exceljs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);
const planillaOrdersPath = path.join(__dirname, '../', 'excel', 'planilla.xls');
let planillaOrdersTemplate;
fs.readFile(planillaOrdersPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the EXCEL file:', err);
    return;
  }
  planillaOrdersTemplate = data
});

const excelOrdersPath = path.join(__dirname, '../', 'excel', 'excel.xls');
let excelOrdersTemplate;
fs.readFile(excelOrdersPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the EXCEL file:', err);
    return;
  }
  excelOrdersTemplate = data
});

function throwErrorIfNotExists(order) {
  if (!order)
    throw { statusCode: StatusCodes.NOT_FOUND, message: "Order not found" };
}

function checkAuthorizerPermission(order, user) {
  if (user.role == ROLES.AUTHORIZER && order.clientId != user.client.id)
    throw { statusCode: StatusCodes.UNAUTHORIZED, message: "client id of the order does not match with user client id" }
}

function checkApplicantPermission(order, user) {
  if (user.role == ROLES.APPLICANT && order.applicantUserId != user.id)
    throw { statusCode: StatusCodes.UNAUTHORIZED, message: "applicant user id of the order does not match with user id" }
}

export default {
  /**
   * /orders [GET]
   * @returns 200 and array of @Order
   */
  getAll: async (req, res, next) => {
    try {
      const params = req.query
      splitByComma(params, "status")
      splitByComma(params, "transportType")
      splitByComma(params, "passengerType")
      const orders = await ordersService.getAll(params, req.user);
      res.status(200).json(toLowerCaseRelations(orders));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /to-planilla [GET]
   * @returns
   */
  toPlanilla: async (req, res, next) => {
    try {
      const params = req.query
      splitByComma(params, "status")
      splitByComma(params, "transportType")
      splitByComma(params, "passengerType")
      const orders = await ordersService.getAll(params, req.user);
      const totalPrice = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
      let ordersExcel = '';
      for (let order of orders) {
        ordersExcel += `<tr>\n`
        ordersExcel += `<td>${STATUS_ID_TO_TRANSLATED_NAME[order.statusId] || ''}</td>\n`
        ordersExcel += `<td>Nro ${order.number || ''}</td>\n`
        ordersExcel += `<td>${order.registrationDate || ''}</td>\n`
        ordersExcel += `<td>${order.passengerType == 'companion' ? 'Acompañante' : 'Titular'}</td>\n`
        ordersExcel += `<td>${order.firstName || ''} ${order.lastName || ''}</td>\n`
        ordersExcel += `<td>${toUpperCase(order.documentType)} ${order.document || ''}</td>\n`
        ordersExcel += `<td>${order.transportType || ''}</td>\n`
        ordersExcel += `<td></td>\n`
        ordersExcel += `<td>${order.tickets || ''}</td>\n`
        ordersExcel += order.issueDate != null ? `<td>${order.issueDate || ''}</td>\n` : `<td></td>\n`
        ordersExcel += order.price != '0.00' ? `<td align='right'>${order.price}</td>\n` : `<td></td>\n`
        ordersExcel += '</tr>\n'
      }
      const placeholders = {
        orders: ordersExcel,
        totalPrice,
        totalAmount: orders.length,
      }
      const excel = replacePlaceholders(placeholders, planillaOrdersTemplate)

      const dom = new JSDOM(excel);
      const workbook = new ExcelJS.Workbook();
      const tables = dom.window.document.querySelectorAll('table');
      const images = []
      const worksheet = workbook.addWorksheet("planilla");
      let actualRow = 0;

      for (let index = 0; index < tables.length; index++) {
        const table = tables[index]
        const fontSize = parseInt(table.getAttribute('fontSize')) || 10;
        const border = parseInt(table.getAttribute('border')) || 0;
        const rows = table.querySelectorAll('tr');
  
        for (let rowIndex = 0; rowIndex < rows.length; rowIndex ++) {
          const row = rows[rowIndex]
          const cells = row.querySelectorAll('td, th');
          const rowData = [];
          let columnOffset = 0;
  
          for (let cellIndex = 0; cellIndex < cells.length; cellIndex++) {
            const cell = cells[cellIndex]
            const colIndex = cellIndex + 1 + columnOffset; // Ajustar por celdas combinadas
            const rawText = cell.innerHTML
            const isImage = rawText.includes("<img src=")
            const isBold = rawText.includes("<strong>")
            const text = cell.textContent.trim();
            const colspan = parseInt(cell.getAttribute('colspan')) || 1;
            const rowspan = parseInt(cell.getAttribute('rowspan')) || 1;
            if (isImage) {
              const match = rawText.match(/<img.*?src="(.*?)"/);
              const imageSrc = match[1]
              const imagePath = path.join(__dirname, '../', '../', imageSrc);
              let buffer = fs.readFileSync(imagePath);
              const { width, height } = await getWidthAndHeight(buffer)
              const imageId = workbook.addImage({
                buffer: buffer,
                extension: 'jpeg',
              })
              images.push({
                id: imageId,
                data: {
                  tl: { col: colIndex-1, row: actualRow },
                  ext: { width, height },
                  editAs: 'oneCell'
                }
              })
              
              continue
            }
            rowData.push({ text, colIndex, colspan, rowspan, isBold, isLastCol: cellIndex+1 == cells.length });
            columnOffset += colspan - 1; // Ajustar el desplazamiento para las celdas combinadas
          }
  
          const roww = worksheet.getRow(actualRow+1)
          actualRow++
          rowData.forEach((cellData) => {
            const { text, colIndex, isBold, isLastCol } = cellData;
            const cell = roww.getCell(colIndex)
            cell.value = text || '';
            cell.font = { size: fontSize, bold: isBold }
            if (border != 0) {
              cell.border = {}
              if (rowIndex == 0) {
                cell.border.top = {style:'thin'}
              }
              if (colIndex == 1) {
                cell.border.left = {style:'thin'}
              }
              if (isLastCol) {
                cell.border.right = {style:'thin'}
              }
              if (rowIndex +1 == rows.length) {
                cell.border.bottom = {style:'thin'}
              }
            }
          });
        }
      }
      images.forEach(image => {
        worksheet.addImage(image.id, image.data)
      })
      res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      );
      res.setHeader(
        'Content-Disposition',
        'attachment; filename="tabla_convertida.xlsx"'
      );
      await workbook.xlsx.write(res);
      res.end();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /to-excel [GET]
   * @returns
   */
  toExcel: async (req, res, next) => {
    try {
      const params = req.query
      splitByComma(params, "status")
      splitByComma(params, "transportType")
      splitByComma(params, "passengerType")
      const orders = await ordersService.getAll(params, req.user);
      const totalPrice = orders.reduce((acc, order) => acc + parseFloat(order.price), 0);
      let ordersExcel = '';
      for (let order of orders) {
        const orderByStatusId = {
          [STATUSES_VALUES.OPEN]: order.registrationDate,
          [STATUSES_VALUES.AUTHORIZED]: order.authorizeDate,
          [STATUSES_VALUES.CLOSED]: order.targetDate,
          [STATUSES_VALUES.REJECTED]: order.targetDate,
          [STATUSES_VALUES.REJECTED_FROM_OPEN]: order.targetDate,
          [STATUSES_VALUES.CANCELED]: order.targetDate,
        }
        const dateByStatus = orderByStatusId[order.statusId]
        const businessName = order?.Client?.businessName || ''
        ordersExcel += `<tr>\n`
        ordersExcel += `<td>${STATUS_ID_TO_TRANSLATED_NAME[order.statusId] || ''}</td>\n`
        ordersExcel += `<td>${dateByStatus || ''}</td>\n`
        ordersExcel += `<td>Nro ${order.number || ''}</td>\n`
        ordersExcel += `<td>Nro ${order.root || ''}</td>\n`
        ordersExcel += `<td>${order.registrationDate || ''}</td>\n`
        ordersExcel += `<td>${businessName || ''}</td>\n`
        ordersExcel += `<td>${order.passengerType == 'companion' ? 'Acompañante' : 'Titular'}</td>\n`
        ordersExcel += `<td>${order.firstName || ''} ${order.lastName || ''}</td>\n`
        ordersExcel += `<td>${toUpperCase(order.documentType)} ${order.document || ''}</td>\n`
        ordersExcel += `<td>${order.phones || ''}</td>\n`
        ordersExcel += `<td>${order.transportType || ''}</td>\n`
        ordersExcel += `<td></td>\n`
        ordersExcel += `<td>${order.tickets || ''}</td>\n`
        ordersExcel += order.issueDate != null ? `<td>${order.issueDate || ''}</td>\n` : `<td></td>\n`
        ordersExcel += order.price != '0.00' ? `<td align='right'>${order.price}</td>\n` : `<td></td>\n`
        ordersExcel += '</tr>\n'
      }
      const placeholders = {
        orders: ordersExcel,
        totalPrice,
        totalAmount: orders.length,
      }
      const excel = replacePlaceholders(placeholders, excelOrdersTemplate)
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader('Content-Disposition', 'attachment; filename="archivo.xls"');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.send(excel);
    } catch (e) {
      next(e);
    }
  },


  /**
   * /orders [POST]
   * Not allowed to auditors
   * @returns 200 and @Order
   */
  create: async (req, res, next) => {
    try {
      const createdOrder = await ordersService.create(req.body, req.user);
      res.status(200).json(toLowerCaseRelations(createdOrder));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id} [PUT]
   * Not allowed to auditors
   * @returns 200 and updated @Order
   */
  update: async (req, res, next) => {
    try {
      const user = req.user
      const order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, user);
      checkApplicantPermission(order, user)
      const updatedOrder = await ordersService.update(req.params.id, req.body, user);
      res.status(200).json(toLowerCaseRelations(updatedOrder));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id} [GET]
   * @returns 200 and pdf @Order
   */
  downloadPdf: async (req, res, next) => {
    try {
      await ordersService.downloadPdf(req.params.id, res);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id} [GET]
   * @returns 200 and @Order
   */
  getById: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id);
      throwErrorIfNotExists(order);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(toLowerCaseRelations(order));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id} [DELETE]
   * @returns 204 no content if was deleted
   */
  deleteById: async (req, res, next) => {
    try {
      const user = req.user
      const order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, user);
      checkApplicantPermission(order, user)
      checkApplicantPermission(order, user)
      if (user.role == ROLES.APPLICANT || user.role == ROLES.AUTHORIZER) {
        const allowedStatusesToDelete = [STATUSES.OPEN, STATUSES.REJECTED, STATUSES.REJECTED_FROM_OPEN]
        if (!allowedStatusesToDelete.includes(order.Status.reservedName)) {
          throw { statusCode: StatusCodes.UNAUTHORIZED, message: "the order could not be deleted with the current status, insufficient permissions" }
        }
      }
      await ordersService.deleteOrder(order);
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/authorize [PUT]
   * @returns 200 and @Order
   */
  authorize: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user)
      order = await ordersService.authorize(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(toLowerCaseRelations(order));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/close [PUT]
   * @returns 200 and @Order
   */
  close: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user)
      order = await ordersService.close(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(toLowerCaseRelations(order));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/reject [PUT]
   * @returns 200 and @Order
   */
  reject: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user);
      order = await ordersService.reject(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(toLowerCaseRelations(order));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/cancel [PUT]
   * @returns 200 and @Order
   */
  cancel: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user);
      order = await ordersService.cancel(order, req.user);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(toLowerCaseRelations(order));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /orders/{id}/open [PUT]
   * @returns 200 and @Order
   */
  open: async (req, res, next) => {
    try {
      let order = await ordersService.getById(req.params.id)
      throwErrorIfNotExists(order)
      checkAuthorizerPermission(order, req.user);
      checkApplicantPermission(order, req.user);
      order = await ordersService.open(order);
      order = await ordersService.getById(req.params.id);
      order = await ordersService.completeOrderData(order)
      res.status(200).json(toLowerCaseRelations(order));
    } catch (e) {
      next(e);
    }
  },

};
