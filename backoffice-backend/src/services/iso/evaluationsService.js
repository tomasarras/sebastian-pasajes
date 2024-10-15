import { ISOEvalEv, ISOEvalEvc, ISOEvalAdm } from "../db/index.js"

export const getAllSells = async () => {
	return await ISOEvalEv.findAll()
};

export const getAllEvc = async () => {
	return await ISOEvalEvc.findAll()
};

export const getAllAdm = async () => {
	return await ISOEvalAdm.findAll()
};