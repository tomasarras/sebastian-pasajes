import { StatusCodes } from "http-status-codes";
import { Op } from 'sequelize';

export const replaceFields = (fieldsToReplace, array) => {
  Object.keys(fieldsToReplace).forEach(key => {
    array.forEach(item => {
      item[fieldsToReplace[key]] = item[key]
      delete item[key]
    })
  })
  return array
}

export const newId = async (entity) => {
  const entityDb = await entity.findOne({
    attributes: ['Id'],          // Solo seleccionar el campo 'id'
    order: [['Id', 'DESC']]       // Ordenar por id en orden descendente
  });
  return entityDb ? entityDb.Id +1 : 1
}

export const toLowerCaseRelations = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(toLowerCaseRelations);
    } else if (obj !== null && typeof obj === 'object') {
      return Object.keys(obj).reduce((acc, key) => {
        const lowerCaseKey = key.charAt(0).toLowerCase() + key.slice(1);
        acc[lowerCaseKey] = toLowerCaseRelations(obj[key]);
        return acc;
      }, {});
    } else {
      return obj;
    }
};

export const today = () => {
  const today = new Date();
  return today.toISOString().split('T')[0];
}
export const toPascalCaseRelations = (obj) => {
  if (Array.isArray(obj)) {
    return obj.map(toPascalCaseRelations);
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const lowerCaseKey = key.charAt(0).toUpperCase() + key.slice(1);
      acc[lowerCaseKey] = toPascalCaseRelations(obj[key]);
      return acc;
    }, {});
  } else {
    return obj;
  }
};

export const filterAttributes = (originalJson, keysToKeep) => {
  const filteredJson = {};

  keysToKeep.forEach(key => {
    if (originalJson.hasOwnProperty(key)) {
      filteredJson[key] = originalJson[key];
    }
  });

  return filteredJson;
}

export function useLikeOperation(where) {
  Object.keys(where).forEach(key => {
    where[key] = { [Op.like]: `%${where[key]}%` }
  })
  return where
}

export function stringifyDate(date) {
  if (!(date instanceof Date)) {
    return null
  }
  return date.toISOString().split('T')[0];
}

export function throwErrorIfNotExists(entity, entityName) {
	if (!entity)
		throw { statusCode: StatusCodes.NOT_FOUND, message: `${entityName} not found` };
}