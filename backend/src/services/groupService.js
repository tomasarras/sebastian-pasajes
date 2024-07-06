import { StatusCodes } from "http-status-codes";
import { ClientGroup } from "../db/index.js";
import { Op } from "sequelize";
import { EMPTY_GROUP } from "../utils/constants.js";
import { throwErrorIfNotExists } from "../utils/functions.js";

export const create = async (groupName) => {
    const existsGroup = await ClientGroup.findOne({ where: { name: groupName } })
    if (existsGroup)
        throw { message: `group with name ${groupName} already exists`, statusCode: StatusCodes.BAD_REQUEST }
    const group = await ClientGroup.create({ name: groupName })
    return group.get({ plain: true })
};

export const update = async (groupId, newGroupName) => {
    const existsGroup = await ClientGroup.findOne({ where: { name: newGroupName }})
    if (existsGroup)
        throw { message: `group with name ${groupName} already exists`, statusCode: StatusCodes.BAD_REQUEST }
    await ClientGroup.update({ name: newGroupName }, { where: { id: groupId }})
    const updatedGroup = await ClientGroup.findByPk(groupId)
    return updatedGroup.get({ plain: true })
};


export const getAll = async () => {
    const groups = await ClientGroup.findAll({ where: { id: { [Op.ne]: EMPTY_GROUP } } })
    return groups.map(group => group.get({ plain: true }))
};

export const getById = async (id) => {
    const group = await ClientGroup.findByPk(id)
    throwErrorIfNotExists(group, "group")
    return group.get({ plain: true })
};

export const deleteById = async (id) => {
    return ClientGroup.destroy({ where: { id }})
};