import { StatusCodes } from "http-status-codes";

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