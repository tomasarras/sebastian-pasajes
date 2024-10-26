import { IsoEncCor, IsoEncIssn, IsoEncTur, IsoEncTurr, Cliente, Personal } from "../../db/index.js"
import { replaceFields } from "../../utils/functions.js";

export const getAllCor = async () => {
	const encuestas = await IsoEncCor.findAll({ include: [
		{model: Cliente, as:'isoEncCorCliente'},] }
	)
	return replaceFields({isoEncCorCliente: 'cliente'}, encuestas.map(e => e.get({ plain:true })))
};

export const getAllIssn = async () => {
	const encuestas = await IsoEncIssn.findAll({ include: [
		{model: Cliente, as:'isoEncIssnCliente'},] }
	)
	return replaceFields({isoEncIssnCliente: 'cliente'}, encuestas.map(e => e.get({ plain:true })))
};

export const getAllTur = async () => {
	const encuestas = await IsoEncTur.findAll({ include: [
		{model: Personal, as:'isoEncTurPersonal'},] }
	)
	return replaceFields({isoEncTurPersonal: 'personal'}, encuestas.map(e => e.get({ plain:true })))
};

export const getAllTurr = async () => {
	const encuestas = await IsoEncTurr.findAll({ include: [
		{model: Personal, as:'isoEncTurrPersonal'},] }
	)
	return replaceFields({isoEncTurrPersonal: 'personal'}, encuestas.map(e => e.get({ plain:true })))
};