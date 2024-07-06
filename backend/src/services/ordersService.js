import { Op, fn, col } from 'sequelize';
import { Client, Order, Status, User, Company, Passenger } from "../db/index.js"
import { AGENCY_CLIENT_ID, CLIENTS_GROUPS, PASSENGER_TYPES, ROLES, ROLES_VALUES, STATUSES, STATUSES_VALUES } from "../utils/constants.js";
import { filterAttributes, stringifyDate } from "../utils/functions.js";

async function createPassangerIfNotExists(passenger) {
    passenger.id = 0
    const { documentType, document } = passenger
    const count = await Passenger.count({ where: { documentType, document } });
    if (count > 0) return
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
        const { observations, derivations, firstName, lastName, documentType, document, nationality, phones, birthdate, transportType, departureDateFrom, departureDateUntil, departureDate, departureDateHour, returnDateFrom, returnDateUntil, returnDate, returnDateHour } = orderParam;
        return { observations, derivations, firstName, lastName, documentType, document, nationality, phones, birthdate, transportType, departureDateFrom, departureDateUntil, departureDate, departureDateHour, returnDateFrom, returnDateUntil, returnDate, returnDateHour };
    }
};

export const getAll = async (where, user) => {
    const { from, to, status } = where
    const whereConditionsToKeep = ["number", "passengerType", "transportType", "clientId"]
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
    if ((status == null || status == undefined) || status == STATUSES.OPEN) {
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
    orderParam.number = lastNumber
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
        const body = "Alta de Orden de Cliente que Reserva";
        //sendEmail(email, subject, body); TODO
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
        const subject = formatSubjectEmail(number, user.client.businessName, fullName)
        const body = '<BODY><FONT FACE="arial"><SMALL>Estimado usuario:<BR><BR>Le informamos que se ha generado una orden de pasaje para el/la Sr/Sra '+fullName+' y la misma se encuentra pendiente de su autorización para poder ser procesada por nuestro personal.<BR><BR>Podrá ingresar al sistema con sus datos de acceso haciendo clic en el siguiente vínculo http://www.sebastianpasajes.com.ar<BR><BR>Muchas gracias!<BR><BR><BR><STRONG>SEBASTIAN VIAJES</STRONG></SMALL></FONT></BODY>';
        //sendEmail(userEmails, subject, body); TODO
    }
    if (orderParam.passengerType == PASSENGER_TYPES.COMPANION) {
        const fatherOrder = await Order.findByPk(orderParam.fatherNumber)
        if (fatherOrder) {
            fatherOrder.companionNumber++
            fatherOrder.save()
        }
    }
    return createdOrder.get({ plain: true })
};

export const update = async (orderId, orderParam, user) => {
    const newOrderValues = getNewOrderValues(orderParam, user.client.id);
    await Order.update(newOrderValues, { where: { id: orderId } });
    const updatedOrder = await Order.findByPk(orderId)
    return updatedOrder.get({ plain: true })
};

export const getById = (orderId) => Order.findByPk(orderId, { include: [Client, Status] });

export const completeOrderData = async (order) => {
    const companions = await Order.findAll({ where: {
        fatherId: order.id,
    },
    include: [Client, Status]
    })
    order = formatOrder(order)
    order.companions = companions.map(companion => {
        const { number, registrationDate, firstName, lastName, documentType, document, transportType, phones } = companion
        return { firstName, lastName, documentType, phones, document, transportType, status: companion.Status.reservedName, number, registrationDate, businessName: companion.Client.name, }
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
    const body = "Orden Autorizada"
    console.log();
    //sendEmail(email, subject, body); TODO
};

export const reject = async (order, user) => {
    const rejectedStatus = ((order.Status.id == STATUSES_VALUES.OPEN) && (user.role == ROLES.AUTHORIZER)) ? 
        STATUSES_VALUES.REJECTED_FROM_OPEN :
        STATUSES_VALUES.REJECTED
    await Order.update({
        statusId: rejectedStatus,
        agentUserId: user.id,
        targetDate: new Date() // TODO: current date and time
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
        targetDate: new Date() //TODO: 
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
        targetDate: new Date() //TODO: 
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
        const body = "Se Abre Orden Rechazada de Cliente que Reserva";
        //sendEmail(email, subject, body); TODO
    }
};