import { StatusCodes } from "http-status-codes";
import { Op } from 'sequelize';
import { Client, ClientGroup, Location } from "../db/index.js"
import { AGENCY_CLIENT_ID, EMPTY_AGENCY_ID, EMPTY_GROUP, EMPTY_LOCATION } from "../utils/constants.js";
import { filterAttributes, throwErrorIfNotExists, useLikeOperation } from "../utils/functions.js";

async function checkBusinessNameNotExists(clientParam) {
    if (clientParam.businessName == undefined) return
    const businessName = clientParam.businessName
    const clientByBusinessName = await Client.findOne({ where: { businessName }})
    if (clientByBusinessName)
        throw { message: `client with business name ${businessName} already exists` , statusCode: StatusCodes.BAD_REQUEST }
}

export const create = async (clientParam) => {
    checkBusinessNameNotExists(clientParam)
    if (clientParam.groupId == null) {
        clientParam.groupId = EMPTY_GROUP
    }
    if (clientParam.locationId == null) {
        clientParam.locationId = EMPTY_LOCATION
    }
    const client = await Client.create(clientParam)
    return client.get({ plain: true })
};

export const update = async (clientId, clientParam) => {
    checkBusinessNameNotExists(clientParam)
    await Client.update(clientParam, { where: { id: clientId }})
    const updatedClient = await Client.findByPk(clientId)
    return updatedClient.get({ plain: true })
};

export const getById = async (id) => {
    const client = await Client.findByPk(id, { include: [ClientGroup, Location] })
    throwErrorIfNotExists(client, "client")
    return client.get({ plain: true })
};

export const getAll = async (where) => {
    const { search } = where
    const skipIds = [EMPTY_AGENCY_ID, AGENCY_CLIENT_ID]
    let clients = []
    if (search) {
        where = {
            [Op.or]: [
                { businessName: { [Op.like]: `%${search}%` } },
                { cuit: { [Op.like]: `%${search}%` } },
                { address: { [Op.like]: `%${search}%` } },
                { province: { [Op.like]: `%${search}%` } },
                { postalCode: { [Op.like]: `%${search}%` } },
                { phones: { [Op.like]: `%${search}%` } }
            ]
        }
    } else {
        const whereConditionsToKeep = ["businessName", "cuit", "address", "province", "postalCode", "phones"]
        where = filterAttributes(where, whereConditionsToKeep)
        where = useLikeOperation(where)
    }
    where.id = { [Op.notIn]: skipIds };

    clients = await Client.findAll({ where, include: [ClientGroup, Location] })
    return clients.map(client => client.get({ plain: true }))
};

export const deleteById = async (id) => {
    return Client.destroy({ where: { id }})
};