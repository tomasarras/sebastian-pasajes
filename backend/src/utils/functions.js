import { StatusCodes } from "http-status-codes";
import { Op } from 'sequelize';
import sizeOf from 'image-size'

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

export function replacePlaceholders(placeholders, html) {
  const placeHoldersKeys = Object.keys(placeholders)
  for (const key of placeHoldersKeys) {
      const regex = new RegExp(`{${key}}`, 'g');
      html = html.replace(regex, placeholders[key]);
  }
  return html
}


export function toUpperCase(str) {
  try {
    return str.toUpperCase()
  } catch {
    return ''
  }
}

export function splitByComma(obj, key) {
  if (key in obj && obj[key].includes(','))
    obj[key] = obj[key].split(',')
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

export async function getWidthAndHeight(imageBuffer) {
  return sizeOf(imageBuffer);
}