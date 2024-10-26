import { IsoEvalEv, Puesto, Personal, IsoEvalEvc, IsoEvalAdm } from "../../db/index.js"
import { replaceFields } from "../../utils/functions.js";

export const getAllEvc = async () => {
	const isoEvals = await IsoEvalEvc.findAll({ include: [
		{model: Puesto, as:'isoEvalEvcPuesto'},
		{model: Personal, as: 'isoEvalEvcPersonal1'},
		{model: Personal, as: 'isoEvalEvcPersonal2'}] }
	)
	return replaceFields({isoEvalEvcPuesto: 'puesto', isoEvalEvcPersonal1: 'personal1', isoEvalEvcPersonal2: 'personal2'}, isoEvals.map(i => i.get({ plain:true })))
};

export const getAllEv = async () => {
	const isoEvals = await IsoEvalEv.findAll({ include: [
		{model: Puesto, as:'isoEvalPuesto'},
		{model: Personal, as: 'personal1'},
		{model: Personal, as: 'personal2'}] }
	)
	return replaceFields({isoEvalPuesto:'puesto'}, isoEvals.map(i => i.get({ plain:true })))
};

export const getAllAdm = async () => {
	const isoEvals = await IsoEvalAdm.findAll({ include: [
		{model: Puesto, as:'isoEvalAdmPuesto'},
		{model: Personal, as: 'isoEvalAdmPersonal1'},
		{model: Personal, as: 'isoEvalAdmPersonal2'}] }
	)
	return replaceFields({isoEvalAdmPuesto:'puesto',isoEvalAdmPersonal1: 'personal1', isoEvalAdmPersonal2: 'personal2'}, isoEvals.map(i => i.get({ plain:true })))
};