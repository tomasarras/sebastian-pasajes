import { StatusCodes } from "http-status-codes";
import { Location, Province } from "../db/index.js";
import { Op } from "sequelize";
import { EMPTY_PROVINCE } from "../utils/constants.js";
import { throwErrorIfNotExists } from "../utils/functions.js";

async function checkNameNotExists(provinceParam, provinceId) {
    if (provinceParam.name == undefined) return
    const provinceName = provinceParam.name
    const provinceByName = await Province.findOne({ where: { name: provinceName }})
    if (provinceByName && provinceByName.id != provinceId)
        throw { message: `province with name ${provinceName} already exists` , statusCode: StatusCodes.BAD_REQUEST }
}

export const getById = async (provinceId) => {
    const province = await Province.findByPk(provinceId, { include: [Location] });
    throwErrorIfNotExists(province, "province")
    return province.get({ plain: true })
}

export const getAll = async () => {
	const provinces = await Province.findAll({ where: { id: {[Op.ne]: EMPTY_PROVINCE} }, include: [Location] })
    return provinces.map(province => province.get({ plain: true }))
};

export const create = async (provinceParam) => {
    await checkNameNotExists(provinceParam)
    const province = await Province.create(provinceParam)
    return getById(province.id)
};

export const update = async (provinceId, provinceParam) => {
    await checkNameNotExists(provinceParam, provinceId)
    await Province.update(provinceParam, { where: { id: provinceId }})
    return getById(provinceId)
};

export const deleteById = async (id) => {
    return Province.destroy({ where: { id }})
};