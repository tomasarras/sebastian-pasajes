import { ISOEncCor, ISOEncIssn, ISOEncTur, ISOEncTurr } from "../db/index.js"

export const getAllCor = async () => {
	return await ISOEncCor.findAll()
};

export const getAllIssn = async () => {
	return await ISOEncIssn.findAll()
};

export const getAllTur = async () => {
	return await ISOEncTur.findAll()
};

export const getAllTurr = async () => {
	return await ISOEncTurr.findAll()
};
