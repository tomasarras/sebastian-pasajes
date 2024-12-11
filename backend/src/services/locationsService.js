import { StatusCodes } from "http-status-codes";
import { Location, Province } from "../db/index.js";
import { Op } from "sequelize";
import { EMPTY_LOCATION, EMPTY_PROVINCE } from "../utils/constants.js";
import { throwErrorIfNotExists } from "../utils/functions.js";

async function checkNameNotExists(locationParam, locationId) {
    if (locationParam.name == undefined) return
    const locationName = locationParam.name
    const locationByName = await Location.findOne({ where: { name: locationName }})
    if (locationByName && locationByName.id != locationId)
        throw { message: `location with name ${locationName} already exists` , statusCode: StatusCodes.BAD_REQUEST }
}

export const getById = async (locationId) => {
    const location = await Location.findByPk(locationId, { include: [Province] });
    throwErrorIfNotExists(location, "location")
    return location.get({ plain: true })
}

export const getAll = async () => {
    const locations = await Location.findAll({ where: { id: { [Op.ne]: EMPTY_LOCATION }},
        include: [Province] });
    return locations.map(location => location.get({ plain: true }))
}

export const create = async (locationParam) => {
    if (locationParam.provinceId == null)
        locationParam.provinceId = EMPTY_PROVINCE
    await checkNameNotExists(locationParam)
    const location = await Location.create(locationParam)
    return getById(location.id)
};

export const update = async (locationId, locationParam) => {
    await checkNameNotExists(locationParam, locationId)
    if (locationParam.provinceId === null || locationParam.provinceId === undefined)
        locationParam.provinceId = EMPTY_LOCATION
    await Location.update(locationParam, { where: { id: locationId }})
    return getById(locationId)
};

export const deleteById = async (id) => {
    return Location.destroy({ where: { id }})
};