import * as paymentOrdersService from "../services/paymentOrdersService.js";
import { toLowerCaseRelations, toPascalCaseRelations } from "../utils/functions.js";

export default {
  /**
   * /clients [GET]
   * @returns 200 and array of @Client
   */
  getAll: async (req, res, next) => {
    try {
      const paymentOrders = await paymentOrdersService.getAll(req.query);
      res.status(200).json(toLowerCaseRelations(paymentOrders));
    } catch (e) {
      next(e);
    }
  },

  create: async (req, res, next) => {
    try {
      req.body.idUsuario = req.user.username
      const newOrder = await paymentOrdersService.create(toPascalCaseRelations(req.body));
      res.status(201).json(toLowerCaseRelations(newOrder));
    } catch (e) {
      next(e);
    }
  },

  update: async (req, res, next) => {
    try {
      const updatedOrder = await paymentOrdersService.update(req.params.id, toPascalCaseRelations(req.body));
      res.status(200).json(toLowerCaseRelations(updatedOrder));
    } catch (e) {
      next(e);
    }
  },

  deleteById: async (req, res, next) => {
    try {
      const deletedOrder = await paymentOrdersService.deleteById(req.params.id);
      res.status(200).json(toLowerCaseRelations(deletedOrder));
    } catch (e) {
      next(e);
    }
  },

  uploadFile: async (req, res, next) => {
    try {
      if (!req.file) {
        throw new Error('No se ha proporcionado ningún archivo');
      }

      const fileData = {
        orderId: req.params.id,
        fileName: req.file.filename,
        originalName: req.file.originalname,
        filePath: req.file.path,
        fileType: req.file.mimetype,
        fileSize: req.file.size,
        observaciones: req.body.observaciones,
      };

      const updatedOrder = await paymentOrdersService.attachFile(fileData);
      res.status(200).json(toLowerCaseRelations(updatedOrder));
    } catch (e) {
      next(e);
    }
  },

  deleteFile: async (req, res, next) => {
    try {
      const { id } = req.params;

      const deletedFile = await paymentOrdersService.deleteFile(id);
      res.status(200).json(toLowerCaseRelations(deletedFile));
    } catch (e) {
      next(e);
    }
  },

  downloadFile: async (req, res, next) => {
    try {
      const { id } = req.params;
      const fileData = await paymentOrdersService.getFile(id);
      
      // Configuramos los headers para la descarga
      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Content-Disposition', `attachment; filename="${fileData.fileName}"`);
      
      // Enviamos el archivo
      res.download(fileData.filePath, fileData.fileName, (err) => {
        if (err) {
          next(err);
        }
      });
    } catch (e) {
      next(e);
    }
  },

  notify: async (req, res, next) => {
    try {
      const { id } = req.params;

      const notificationResult = await paymentOrdersService.notifyOrder(id);
      res.status(200).json(notificationResult);
    } catch (e) {
      next(e);
    }
  }
};