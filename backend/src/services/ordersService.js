import { Op, fn, col } from 'sequelize';
import { Client, Order, Status, User, Company, Passenger } from "../db/index.js"
import { AGENCY_CLIENT_ID, CLIENTS_GROUPS, PASSENGER_TYPES, ROLES, ROLES_VALUES, STATUSES, STATUSES_VALUES } from "../utils/constants.js";
import { filterAttributes, replacePlaceholders, stringifyDate } from "../utils/functions.js";
import PDFDocument from 'pdfkit'
import { sendEmail } from './emailService.js';
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const newOrderAdminTemplatePath = path.join(__dirname, '../', 'mail', 'new_order_admin_template.html');
const logoPath = path.join(__dirname, '../', 'assets', 'Logo2.jpg');
const newOrderClientTemplatePath = path.join(__dirname, '../', 'mail', 'new_order_client_template.html');
const authorizedOrderAdminTemplatePath = path.join(__dirname, '../', 'mail', 'authorized_order_admin_template.html');
const reopenOrderTemplatePath = path.join(__dirname, '../', 'mail', 'reopen_order_template.html');
let authorizedOrderAdminTemplateHtml;
fs.readFile(authorizedOrderAdminTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    authorizedOrderAdminTemplateHtml = data
});
let reopenOrderTemplateHtml;
fs.readFile(reopenOrderTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    reopenOrderTemplateHtml = data
});
let newOrderAdminTemplateHtml;
fs.readFile(newOrderAdminTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    newOrderAdminTemplateHtml = data
});
let newOrderClientTemplateHtml;
fs.readFile(newOrderClientTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    newOrderClientTemplateHtml = data
});

async function createPassangerIfNotExists(passenger) {
    passenger.id = 0
    const { documentType, document, clientId } = passenger
    const p = await Passenger.findOne({ where: { documentType, document, clientId  } });
    if (p && p.email == '' && passenger.email && passenger.email != '') { // Existe pasajero y no tiene email, se lo agrego
        p.email = passenger.email
        p.save()
        return
    }
    if (p) return // Existe pasajero con un email, no lo creo
    const createdPassenger = await Passenger.create(passenger)
    return createdPassenger
}

function getDefaultWhere(user) {
    const roleUser = user.role
    let defaultWhere = {
        passengerType: PASSENGER_TYPES.HOLDER,
        statusId: STATUSES_VALUES.OPEN,
        '$Client.immediate$': 'S',
    };
    if (roleUser == ROLES.APPLICANT) {
        defaultWhere['$Client.action$'] = 'SR'
    }
    return defaultWhere
}

function formatSubjectEmail(number, businessName, fullName) {
    number = number.toString().padStart(6, '0');
    businessName = businessName.substring(0, 15);
    fullName = fullName.substring(0, 25);
    return `${number} - ${businessName} - ${fullName}`
}

function formatOrder(order) {
    const orderData = order.get({ plain: true });
    return {
        ...orderData,
        Status: orderData.Status.reservedName
    };
}

const getNewOrderValues = (orderParam, clientId) => {
    if (clientId === AGENCY_CLIENT_ID) {
        const { observationAgent, companies, tickets, issueDate, price } = orderParam;
        return { observationAgent, companies, tickets, issueDate, price };
    } else {
        const { observations, email, derivations, firstName, lastName, documentType, document, nationality, phones, birthdate, transportType, departureFrom, departureTo, departureDate, departureDateHour, returnFrom, returnTo, returnDate, returnDateHour } = orderParam;
        return { observations, email, derivations, firstName, lastName, documentType, document, nationality, phones, birthdate, transportType, departureFrom, departureTo, departureDate, departureDateHour, returnFrom, returnTo, returnDate, returnDateHour };
    }
};

export const getAll = async (where, user) => {
    const { from, to, status } = where
    const whereConditionsToKeep = ["number", "status", "firstName", "lastName", "document", "passengerType", "transportType", "clientId"]
    where = filterAttributes(where, whereConditionsToKeep)
    const isEmptyWhere = (Object.keys(where).length == 0) && from == undefined && to == undefined && status == undefined
    where = isEmptyWhere ? getDefaultWhere(user) : where
    const roleUser = user.role
    const clientGroupId = user.client.group.id
    if (roleUser == ROLES.AUTHORIZER) {
        where.clientId = user.client.id;
    }
    if (roleUser == ROLES.APPLICANT) {
        where.applicantUserId = user.id
    }
    if (roleUser == ROLES.AUDITOR) {
        if (clientGroupId != CLIENTS_GROUPS.UNASSIGNED && clientGroupId != 0){
            where['$Client.groupId$'] = user.client.group.id;
        } else {
            where.clientId = user.client.id;
        }
    }
    if (user.client.id == AGENCY_CLIENT_ID && where.clientId) {
        where['$Client.id$'] = where.clientId
    }
    if (status) {
        where['$Status.reserved_name$'] = status
    }
    let dateField;
    if ((status == null || status == undefined) || status.includes(STATUSES.OPEN)) {
        dateField = "registrationDate"
    } else if (status == STATUSES.AUTHORIZED) {
        dateField = "authorizeDate"
    } else if (status == STATUSES.CLOSED || status == STATUSES.REJECTED || status == STATUSES.CANCELED || status == STATUSES.REJECTED_FROM_OPEN) {
        dateField = "targetDate"
    }
    if (from && to) {
        where[dateField] = { [Op.between]: [from, to] }
    } else if (from) {
        where[dateField] = { [Op.gte]: from }
    } else if (to) {
        where[dateField] = { [Op.lte]: to }
    }
    if (where.firstName) {
        where.firstName = { [Op.like]: `%${where.firstName}%` }
    }
    if (where.lastName) {
        where.lastName = { [Op.like]: `%${where.lastName}%` }
    }
    delete where.status
	const orders = await Order.findAll({ 
        where,
        include: [Client, { model: Status, attributes: ['name'] },
        { model: User, as: 'ApplicantUser' , attributes: ["firstName", "lastName"] },
        { model: User, as: 'AuthorizerUser', attributes: ["firstName", "lastName"] }],
        order: [
            [Status, 'name', 'ASC'],
            ['clientId', 'ASC'],
            ['registrationDate', 'ASC']
        ]
    })
	return orders.map(formatOrder)
};

export const create = async (orderParam, user) => {
    orderParam.registrationDate = stringifyDate(new Date())
    const passenger = orderParam.passenger
    delete orderParam.passenger
    const result = await Order.findOne({ 
        where: { clientId: user.client.id },
        attributes: [
            [fn('MAX', col('number')), 'maxNumber'],
        ]
    });
    const { maxNumber } = result.dataValues;
    orderParam.clientId = user.client.id
    let lastNumber = maxNumber
    if (maxNumber == null) {
        const client = await Client.findByPk(user.client.id);
        const nextBookCode = client.nextBookCode;
        lastNumber = nextBookCode != 0 ? nextBookCode : 1
    }
    orderParam.number = lastNumber+1
    if (orderParam.passengerType == PASSENGER_TYPES.COMPANION) {
        orderParam.fatherId = orderParam.fatherNumber;
        orderParam.root = orderParam.fatherNumber;
    } else {
        orderParam.fatherNumber = 0
        orderParam.fatherId = 0
        orderParam.root = lastNumber
    }
    orderParam.statusId = STATUSES_VALUES.OPEN
    orderParam.applicantUserId = user.id
    orderParam.authorizerUserId = 1
    orderParam.agentUserId = 1
    orderParam.price = 0
    orderParam.tickets = ""
    orderParam.companies = ""
    orderParam.observationAgent = ""
    orderParam.companionNumber = 0
    orderParam.authorizeDate = null
    orderParam.targetDate = null
    orderParam.issueDate = null
    Object.assign(orderParam, passenger)
    const fullName = `${passenger.firstName} ${passenger.lastName}`
    const createdOrder = await Order.create(orderParam)
    if (user.client.action == 'SR' && orderParam.passengerType == PASSENGER_TYPES.HOLDER) {
        const [company] = await Company.findAll()
        const email = company.emailNotification
        const subject = formatSubjectEmail(orderParam.number, user.client.businessName, fullName)
        const text = "Alta de Orden de Cliente que Reserva";
        const placeholders = {
            orderNumber: orderParam.number.toString().padStart(6, '0'),
            passengerFullName: fullName,
            bussinessName: user.client.businessName,
            id: createdOrder.id,
        }
        const html = replacePlaceholders(placeholders, newOrderAdminTemplateHtml)
        //sendEmail(email, subject, html, text) // envio de email al crear desactivado a pedido de Nicolas. Descomentar esta linea para enviar.
        passenger.clientId = user.client.id
        passenger.registrationDate = orderParam.registrationDate
        createPassangerIfNotExists(passenger);
    }
    if (orderParam.passengerType == PASSENGER_TYPES.HOLDER && user.client.mailAuto == 1) {
        const users = await User.findAll({ where: {
            inactive: 0,
            profileId: ROLES_VALUES.AUTHORIZER,
            email: { [Op.ne]: '' },
            clientId: user.client.id,
        }, attributes: ['email']})
        const userEmails = users.map(user => user.get({plain:true}).email)
        const subject = formatSubjectEmail(orderParam.number, user.client.businessName, fullName)
        const placeholders = {
            passengerFullName: fullName,
            id: createdOrder.id,
        }
        const html = replacePlaceholders(placeholders, newOrderClientTemplateHtml)
        const text = 'Le informamos que se ha generado una orden de pasaje para el/la Sr/Sra '+fullName+' y la misma se encuentra pendiente de su autorización'
        sendEmail(userEmails, subject, html, text);
    }
    if (orderParam.passengerType == PASSENGER_TYPES.COMPANION) {
        const fatherOrder = await Order.findByPk(orderParam.fatherNumber)
        if (fatherOrder) {
            fatherOrder.companionNumber++
            fatherOrder.save()
        }
    }
    const or = await getById(createdOrder.id)
    return completeOrderData(or)
};

export const update = async (orderId, orderParam, user) => {
    const newOrderValues = getNewOrderValues(orderParam, user.client.id);
    await Order.update(newOrderValues, { where: { id: orderId } });
    const updatedOrder = await getById(orderId)
    return completeOrderData(updatedOrder)
};

export const downloadPdf = async (orderId, res) => {
    try {
        const order = await getById(orderId)
        const solicitante = await User.findByPk(order.applicantUserId, { attributes: ['firstName', 'lastName'] });
        const autorizante = await User.findByPk(order.authorizerUserId, { attributes: ['firstName', 'lastName'] });

        const pdf = new PDFDocument({ margin: 25 });
        pdf.pipe(res);

        // Encabezado
        pdf.rect(23, 12, 570, 80).stroke();
        pdf.image(logoPath, 30, 14, { width: 150 });
        pdf.font('Helvetica-Bold').fontSize(14).text('ORDEN DE PASAJE', { align: 'center' });

        pdf.font('Helvetica-Bold').fontSize(10)
            .text(`${order.Client?.businessName || ''}`, { align: 'right' })
            .text(`N°: ${order.number.toString().padStart(6, '0')}`, { align: 'right' });

        pdf.text(`Fecha: ${formatDate(order.registrationDate)}`, { align: 'right' });
        pdf.font('Helvetica')
            .text(`Rogamos emitir pasaje según los siguientes datos:`, { align: 'left' });

        pdf.moveDown();
        pdf.rect(23, 93, 570, 80).stroke();
        pdf.font('Helvetica-Bold').text('Datos del Pasajero:', { underline: true });
        pdf.font("Helvetica");
        
        let col1LeftPos = 25;
        let colTop = 125;
        let colWidth = 250;
        let col2Width = colWidth + 50;
        let col2LeftPos = colWidth + col1LeftPos + 40;
        pdf.text(`Apellido y Nombres:        ${order.lastName} ${order.firstName}`, col1LeftPos, colTop, {width: colWidth})
        pdf.text(`Tipo:                               ${order.passengerType == 'holder' ? 'Titular' : 'Acompañante'}`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        pdf.text(`${order.documentType}:                                 ${order.document}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Nacionalidad:                 ${order.nationality}`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        pdf.text(`Teléfono de Contacto:     ${order.phones}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Fecha de Nacimiento:    ${formatDate(order.birthdate)} - ${calculateAge(order.birthdate)} años`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        pdf.text(``, 25, colTop);
        pdf.moveDown();
        colTop = 184;
        col2LeftPos = colWidth + col1LeftPos + 40;
        pdf.font('Helvetica-Bold').text('Datos del Boleto:', col1LeftPos, colTop, { width: colWidth, underline: true });
        pdf.font("Helvetica").text(`Tipo:                               ${order.transportType}`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        pdf.text(`Ida Desde:                      ${order.departureFrom || ''}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Ida Fecha:                      ${formatDate(order.departureDate)}`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        pdf.text(`Ida Hasta:                       ${order.departureTo || ''}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Ida Hora:                        ${order.departureDateHour || ''}`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        pdf.text(`Regreso Desde:              ${order.returnFrom || ''}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Regreso Fecha:             ${formatDate(order.returnDate)}`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        pdf.text(`Regreso Hasta:               ${order.returnTo || ''}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Regreso Hora:               ${order.returnDateHour || ''}`, col2LeftPos, colTop, {width: col2Width});
        colTop += 16
        colTop += 8
        pdf.rect(23, 173, 570, 90).stroke();
        pdf.text(``, 25, colTop);
        pdf.moveDown();
        pdf.font("Helvetica-Bold").text('Observaciones:', col1LeftPos, colTop, { width: 100, underline: true });
        pdf.font("Helvetica").text(order.observations || 'Sin observaciones.', 135, colTop);
        pdf.rect(23, 263, 570, 75).stroke();
        
        colTop += 72
        pdf.font('Helvetica-Bold').text('Datos del Solicitante:', col1LeftPos, colTop, { underline: true });
        colTop += 16
        pdf.font('Helvetica')
        pdf.text(`Apellido y Nombres:        ${solicitante ? `${solicitante.lastName} ${solicitante.firstName}` : ''}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Deriv./Exped.: ${order.derivations || ''}`, col2LeftPos, colTop, {width: colWidth});
        pdf.rect(23, 338, 570, 40).stroke();

        colTop += 24
        pdf.font('Helvetica-Bold').text('Datos del Autorizante:', col1LeftPos, colTop, { underline: true });
        pdf.font('Helvetica')
        colTop += 16
        pdf.text(`Apellido y Nombres:        ${autorizante ? `${autorizante.lastName} ${autorizante.firstName}` : ''}`, col1LeftPos, colTop, {width: colWidth});
        pdf.text(`Fecha Autorización: ${formatDate(order.authorizeDate)}`, col2LeftPos, colTop, {width: colWidth});
        pdf.rect(23, 378, 570, 40).stroke();
        
        colTop += 24
        pdf.font('Helvetica-Bold').text('Para ser completado por Sebastian & Co:', col1LeftPos, colTop, { underline: true });
        pdf.font('Helvetica')
        pdf.text(`Empresa de Transporte: ${order.companies || ''}`);
        pdf.text(`N° de Boleto/Tkt: ${order.tickets || ''}`);
        pdf.text(`Fecha Emisión: ${formatDate(order.issueDate)}`);
        pdf.text(`Total OP $: ${order.price || ''}`);
        pdf.rect(23, 418, 570, 65).stroke();
        
        colTop += 64
        pdf.font('Helvetica-Bold').text('Observaciones del Agente:', col1LeftPos, colTop, { width: colWidth, underline: true });
        pdf.font('Helvetica')
        pdf.text(order.observationAgent || 'Sin observaciones.', 160, colTop, { width: colWidth });
        pdf.rect(23, colTop-4, 570, 65).stroke();

        pdf.end();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al generar el PDF');
    }
}

export const getById = (orderId) => Order.findByPk(orderId, { include: [
    Client,
    Status,
    { model: User, as: 'ApplicantUser' , attributes: ["firstName", "lastName"] },
    { model: User, as: 'AuthorizerUser', attributes: ["firstName", "lastName"] }
]});

export const completeOrderData = async (order) => {
    const companions = await Order.findAll({ where: {
        fatherId: order.id,
    },
    include: [Client, Status]
    })
    order = formatOrder(order)
    order.companions = companions.map(companion => {
        const { id, number, registrationDate, firstName, lastName, documentType, document, transportType, phones } = companion
        return { id, firstName, lastName, documentType, phones, document, transportType, status: companion.Status.reservedName, number, registrationDate, businessName: companion.Client.name, }
    })
    return order
};

export const deleteOrder = async (order) => {
    const fatherOrder = await Order.findByPk(order.fatherNumber)
    if (fatherOrder) {
        fatherOrder.companionNumber--
        fatherOrder.save()
    }
    return order.destroy()
};

export const authorize = async (order, user) => {
    await Order.update({
        statusId: STATUSES_VALUES.AUTHORIZED,
        authorizerUserId: user.id,
        authorizeDate: new Date()// TODO
      }, {
        where: {
          [Op.or]: [
            { id: order.id },
            { fatherId: order.id }
          ]
        }
    });
    const fullName = `${order.firstName} ${order.lastName}`
    const [company] = await Company.findAll()
    const email = company.emailNotification
    const subject = formatSubjectEmail(order.number, order.Client.businessName, fullName)
    const placeholders = {
        orderNumber: order.number,
        passengerFullName: `${order.firstName} ${order.lastName}`,
        bussinessName: user.client.businessName,
        id: order.id,
    }
    const html = replacePlaceholders(placeholders, authorizedOrderAdminTemplateHtml)
    const text = 'Orden Autorizada'
    sendEmail(email, subject, html, text)
};

export const reject = async (order, user) => {
    const rejectedStatus = ((order.Status.id == STATUSES_VALUES.OPEN) && (user.role == ROLES.AUTHORIZER)) ? 
        STATUSES_VALUES.REJECTED_FROM_OPEN :
        STATUSES_VALUES.REJECTED
    await Order.update({
        statusId: rejectedStatus,
        agentUserId: user.id,
        targetDate: new Date()
      }, {
        where: {
            [Op.or]: [
              { id: order.id },
              { fatherId: order.id }
            ]
        }
    });
};

export const cancel = async (order, user) => {
    await Order.update({
        statusId: STATUSES_VALUES.CANCELED,
        agentUserId: user.id,
        targetDate: new Date()
      }, {
        where: {
            [Op.or]: [
                { id: order.id },
                { fatherId: order.id }
            ]
        }
    });
};

export const close = async (order, user) => {
    await Order.update({
        statusId: STATUSES_VALUES.CLOSED,
        agentUserId: user.id,
        targetDate: new Date()
      }, {
        where: {
            [Op.or]: [
                { id: order.id },
                { fatherId: order.id }
            ]
        }
    });
};

export const open = async (order) => {
    await Order.update({
        statusId: STATUSES_VALUES.OPEN,
        authorizerUserId: 1,
        authorizeDate: null
      }, {
        where: {
            [Op.or]: [
                { id: order.id },
                { fatherId: order.id }
            ]
        }
    });
    if (order.Client.action == "SR") {
        const fullName = `${order.firstName} ${order.lastName}`
        const [company] = await Company.findAll()
        const email = company.emailNotification
        const subject = formatSubjectEmail(order.number, order.Client.businessName, fullName)
        const text = "Se Abre Orden Rechazada de Cliente que Reserva";
        const placeholders = {
            orderNumber: order.number,
            id: order.id,
        }
        const html = replacePlaceholders(placeholders, reopenOrderTemplateHtml)
        sendEmail(email, subject, html, text)
    }
};

function formatDate(date) {
    if (!date) return '';
    if (date.length == 10) {
        const [year, month, day] = date.split("-").map(Number);
        date = new Date(year, month - 1, day);
    }
    return new Date(date).toLocaleDateString('es-AR');
}

function calculateAge(date) {
    if (!date) return '';
    const diff = new Date() - new Date(date);
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
}