import { Opago, OpagoEstado, Proveedor, Personal, Usuarios, Parametros, OpagoArchivos } from "../db/index.js"
import { ORDER_PAYMENT_STATUS_IDS } from "../utils/constants.js";
import { filterAttributes, replaceFields, replacePlaceholders, useLikeOperation } from "../utils/functions.js";
import { Op } from 'sequelize';
import { sendEmail } from "./emailService.js";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import { FILES_PATH } from "../middleware/uploadFile.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const newPaymentOrderTemplatePath = path.join(__dirname, '../', 'archivos', 'email', 'new_payment_order.html');
let newPaymentOrderTemplateHtml;
fs.readFile(newPaymentOrderTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    newPaymentOrderTemplateHtml = data
});

const sendOrderTemplatePath = path.join(__dirname, '../', 'archivos', 'email', 'send_order.html');
let sendOrderTemplateHtml;
fs.readFile(sendOrderTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    sendOrderTemplateHtml = data
});

export const getAll = async (where) => {
	if (where == undefined || Object.keys(where).length == 0)
		where = { IdEstado: ORDER_PAYMENT_STATUS_IDS.PENDING }
	const { from, to } = where
	const whereConditionsToKeep = ["Id", "IdOperador", "IdEstado", "NFA", "NFO", "IdUsuario", "FechaP"]
	where = filterAttributes(where, whereConditionsToKeep)
	if (from && to) {
		where.Fecha = {
		  [Op.between]: [from, to]
		};
	} else if (from) {
		where.Fecha = {
		  [Op.gte]: from
		};
	} else if (to) {
		where.Fecha = {
		  [Op.lte]: to
		};
	}
	const paymentOrders = await Opago.findAll({ where, include:[
		{ model: OpagoEstado, as: 'estado', },
		{ model: Proveedor, as: 'operador' },
		{ model: Personal, as: 'personal' },
		{ model: OpagoArchivos, as: 'opagoArchivos' },
		{ model: Usuarios, as: 'usuario', include: [
			{ model: Personal, as: 'personal' }	]
		}
	] })
	return replaceFields({opagoArchivos: "archivos"}, paymentOrders.map(po => po.get({plain:true})))
};

export const create = async (orderData) => {
    // Obtenemos el siguiente ID
    const maxId = await Opago.max('Id');
    orderData.Id = maxId + 1;
    
    // Estado inicial pendiente
    orderData.IdEstado = ORDER_PAYMENT_STATUS_IDS.PENDING;
    
    const newOrder = await Opago.create(orderData);

    // Recuperamos la orden creada con sus relaciones
    const createdOrder = await Opago.findByPk(newOrder.Id, {
        include: [
            { model: OpagoEstado, as: 'estado' },
            { model: Proveedor, as: 'operador' },
            { model: Personal, as: 'personal' },
            { model: OpagoArchivos, as: 'opagoArchivos' },
            { model: Usuarios, as: 'usuario', include: [
                { model: Personal, as: 'personal' }
            ]}
        ]
    });

    const parameters = await Parametros.findOne({ where: { Id:1 }, attributes: ["EMail"]})
    const email = parameters.EMail
    const subject = 'Alta Orden de Pago N° ' +  newOrder.Id
    const text = subject
    const placeholders = {
        NFA: createdOrder.NFA,
        client: createdOrder.Cliente,
        username: createdOrder?.personal?.Nombre + ' ' + createdOrder?.personal?.Apellido,
    }
    const html = replacePlaceholders(placeholders, newPaymentOrderTemplateHtml)
    sendEmail(email, subject, html, text)
    return replaceFields({opagoArchivos: "archivos"}, [createdOrder.get({ plain: true })])[0];
};

export const update = async (orderId, orderData) => {
    const order = await Opago.findByPk(orderId);
    if (!order) {
        throw new Error('Orden de pago no encontrada');
    }

    await Opago.update(orderData, { where: { Id: orderId }});

    // Recuperamos la orden actualizada con sus relaciones
    const updatedOrder = await Opago.findByPk(orderId, {
        include: [
            { model: OpagoEstado, as: 'estado' },
            { model: Proveedor, as: 'operador' },
            { model: Personal, as: 'personal' },
            { model: OpagoArchivos, as: 'opagoArchivos' },
            { model: Usuarios, as: 'usuario', include: [
                { model: Personal, as: 'personal' }
            ]}
        ]
    });
    const ge = updatedOrder.get({ plain: true })

    return replaceFields({opagoArchivos: "archivos"}, [ge])[0];
};

export const deleteById = async (orderId) => {
    const order = await Opago.findByPk(orderId);
    if (!order) {
        throw new Error('Orden de pago no encontrada');
    }

    // Verificamos que la orden esté en estado pendiente
    if (order.IdEstado !== ORDER_PAYMENT_STATUS_IDS.PENDING) {
        throw new Error('Solo se pueden eliminar órdenes en estado pendiente');
    }

    await Opago.destroy({ where: { Id: orderId }});
    return order.get({ plain: true });
};

export const attachFile = async (fileData) => {
    const order = await Opago.findByPk(fileData.orderId);
    if (!order) {
        // Si no existe la orden, eliminamos el archivo subido
        await fsPromises.unlink(fileData.filePath);
        throw new Error('Orden de pago no encontrada');
    }
    let filePath = fileData.filePath.split("/")
    filePath = filePath[filePath.length-1]
    const maxId = await OpagoArchivos.max('Id')
    await OpagoArchivos.create({
        Id: maxId +1,
        IdEntidad: fileData.orderId,
        Descripcion: fileData.observaciones,
        Ruta: filePath,
    });

    // Recuperamos la orden actualizada con sus archivos
    const updatedOrder = await Opago.findByPk(fileData.orderId, {
        include: [
            { model: OpagoEstado, as: 'estado' },
            { model: Proveedor, as: 'operador' },
            { model: Personal, as: 'personal' },
            { model: OpagoArchivos, as: 'opagoArchivos' },
            { model: Usuarios, as: 'usuario', include: [
                { model: Personal, as: 'personal' }
            ]},
        ]
    });

    return replaceFields({opagoArchivos: "archivos"}, [updatedOrder.get({ plain: true })])[0];
};

export const deleteFile = async (fileId) => {
    // Buscamos el archivo en la base de datos
    const file = await OpagoArchivos.findOne({
        where: {
            Id: fileId,
        }
    });

    if (!file) {
        throw new Error('Archivo no encontrado');
    }

    // Construimos la ruta completa del archivo
    const filePath = FILES_PATH + "/" + file.Ruta;

    try {
        // Intentamos eliminar el archivo físico
        await fs.unlink(filePath);
    } catch (error) {
        console.error('Error al eliminar archivo físico:', error);
        // Continuamos incluso si el archivo físico no existe
    }
    const orderId = file.IdEntidad
    // Eliminamos el registro de la base de datos
    await file.destroy();

    // Recuperamos la orden actualizada con sus archivos restantes
    const updatedOrder = await Opago.findByPk(orderId, {
        include: [
            { model: OpagoEstado, as: 'estado' },
            { model: Proveedor, as: 'operador' },
            { model: Personal, as: 'personal' },
            { model: OpagoArchivos, as: 'opagoArchivos' },
            { model: Usuarios, as: 'usuario', include: [
                { model: Personal, as: 'personal' }
            ]},
        ]
    });

    return replaceFields({opagoArchivos: "archivos"}, [updatedOrder.get({ plain: true })])[0];
};

export const getFile = async (fileId) => {
    // Buscamos el archivo en la base de datos
    const file = await OpagoArchivos.findOne({
        where: {
            Id: fileId
        }
    });

    if (!file) {
        throw new Error('Archivo no encontrado id=' + fileId);
    }

    // Construimos la ruta completa del archivo
    const filePath = FILES_PATH + "/" + file.Ruta;

    // Verificamos que el archivo exista físicamente
    try {
        await fsPromises.access(filePath);
    } catch (error) {
        throw new Error('Archivo físico no encontrado');
    }

    return {
        filePath: filePath,
        fileName: file.Ruta
    };
};

export const notifyOrder = async (orderId) => {
    // Buscamos la orden con todas sus relaciones
    const order = await Opago.findByPk(orderId, {
        include: [
            { model: OpagoEstado, as: 'estado' },
            { model: Proveedor, as: 'operador' },
            { model: Personal, as: 'personal' },
            { model: OpagoArchivos, as: 'opagoArchivos' },
            { model: Usuarios, as: 'usuario', include: [
                { model: Personal, as: 'personal' }
            ]},
        ]
    });

    // Validaciones
    if (!order) throw new Error('Orden de pago no encontrada');
    const archivos = order.opagoArchivos
    if (archivos.length == 0) throw new Error('No se encontro el adjunto');
    const userEmail = order.usuario.personal.EMail
    const emailOperador = order.operador.EMail
    if (userEmail == '' && emailOperador == '') throw new Error('Por favor complete el mail del Operador y del Personal');
    if (order.FechaP == '' || order.FechaP == '0000-00-00') throw new Error('Por favor complete la Fecha de Pago');
    
    const emailVendedor = order.personal.EMail
    const nombreVendedor = order.personal.Nombre || ''
    const apellidoVendedor = order.personal.Apellido || ''
    const nombreOperador = order.operador.Nombre
    
    let vendedorFullName;
    if (nombreVendedor == '' && apellidoVendedor == '') {
        const p = await Personal.findOne({ where: { Id: order.personal.Id } })
        vendedorFullName = p.Nombre + " " + p.Apellido
    } else {
        vendedorFullName = nombreVendedor + " " + apellidoVendedor
    }
    let result = { operador: false, user: false, vendedor: false }

    const subject = `Orden de Pago N° ${order.Id} | N°File Operador: ${order.NFO} | Pasajero: ${order.Cliente} | Vendedor: ${vendedorFullName}`
    const text = subject
    const currency = order.Moneda == 0 ? '$' : 'USD'
    const formatNumber = (numStr) => {
        const number = parseFloat(numStr);
        return new Intl.NumberFormat("es-ES", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
        }).format(number);
    };
    const placeholders = {
        nombreOperador,
        fechaP: order.FechaP,
        NFO: order.NFO,
        cliente: order.Cliente,
        transferValue: `${currency}${formatNumber(order.Importe)}`,
        vendedor: vendedorFullName,
        orderId: order.Id
    }
    
    const html = replacePlaceholders(placeholders, sendOrderTemplateHtml)

    // Preparamos las rutas de los archivos adjuntos
    const attachFiles = archivos.map(archivo => FILES_PATH + "/" + archivo.Ruta);

    if (emailOperador != '') {
        await sendEmail(emailOperador, subject, html, text, attachFiles)
        result.operador = true
    }
    if (userEmail != '') {
        await sendEmail(userEmail, subject, html, text, attachFiles)
        result.user = true
    }
    if (emailVendedor != '') {
        await sendEmail(emailVendedor, subject, html, text, attachFiles)
        result.vendedor = true
    }
    return result
};