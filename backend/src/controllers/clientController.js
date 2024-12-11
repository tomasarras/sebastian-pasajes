import * as clientService from "../services/clientsService.js";
import { replacePlaceholders, toLowerCaseRelations } from "../utils/functions.js";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientsExcelPath = path.join(__dirname, '../', 'excel', 'clients.xls');
let clientsExcelTemplate;
fs.readFile(clientsExcelPath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading the EXCEL file:', err);
    return;
  }
  clientsExcelTemplate = data
});


export default {
  /**
   * /clients [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      const clients = await clientService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(clients));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /to-excel [GET]
   */
  toExcel: async (req, res, next) => {
    try {
      const clients = await clientService.getAll(req.query);
      let clientsExcel = ''
      for (let client of clients) {
        clientsExcel += '<tr>\n'
        clientsExcel += `<td>${client.businessName || ''}</td>\n`
        clientsExcel += `<td>Nº ${client.nextBookCode || ''}</td>\n`
        clientsExcel += `<td>${client.cuit || ''}</td>\n`
        clientsExcel += `<td>${client.phones || ''}</td>\n`
        clientsExcel += `</tr>\n`
      }
      const placeholders = {
        clients: clientsExcel,
      }
      const excel = replacePlaceholders(placeholders, clientsExcelTemplate)
      res.setHeader('Content-Type', 'application/vnd.ms-excel');
      res.setHeader('Content-Disposition', 'attachment; filename="clientes.xls"');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');
      res.send(excel);
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients [POST]
   * @returns 200 and @Client
   */
  create: async (req, res, next) => {
    try {
      const createdClient = await clientService.create(req.body);
      res.status(200).json(toLowerCaseRelations(createdClient));
    } catch (e) {
      next(e);
    }
  }, 

  /**
   * /clients/{id} [PUT]
   * Not allowed to auditors
   * @returns 200 and updated @Client
   */
  update: async (req, res, next) => {
    try {
      const updatedClient = await clientService.update(req.params.id, req.body);
      res.status(200).json(toLowerCaseRelations(updatedClient));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients/{id} [GET]
   * @returns 200 and @Client
   */
  getById: async (req, res, next) => {
    try {
      const client = await clientService.getById(req.params.id);
      res.status(200).json(toLowerCaseRelations(client));
    } catch (e) {
      next(e);
    }
  },

  /**
   * /clients/{id} [DELETE]
   * @returns 204 no content if was deleted
   */
  deleteById: async (req, res, next) => {
    try {
      await clientService.deleteById(req.params.id)
      res.status(204).send();
    } catch (e) {
      next(e);
    }
  },

};