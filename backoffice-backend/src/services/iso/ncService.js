import { IsoNc, IsoNcTipo, IsoNcOrigen, IsoNcEstado, IsoNcAuditoria, IsoNcAudicambios, Personal, Usuarios, sequelize } from "../../db/index.js"
import { Op } from 'sequelize';
import { filterAttributes, replaceFields, replacePlaceholders } from "../../utils/functions.js";
import * as emailService from '../emailService.js'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const newIsoNcTemplatePath = path.join(__dirname, '../', '../', 'archivos', 'email', 'new_iso_nc.html');
let newIsoNcTemplateHtml;
fs.readFile(newIsoNcTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    newIsoNcTemplateHtml = data
});

export const getAllOrigen = async () => {
	const origins = await IsoNcOrigen.findAll({ where: { Id: {[Op.ne]: 0} }})
	return origins.map(o => o.get({plain: true}))
}

export const getById = async (id) => {
	const auditoriaData = await IsoNcAuditoria.findAll({
		where: { IdNC: id },
		include: [
			{
				model: IsoNcAudicambios,
				as: 'isoNcAuditoriaIsoNcAudicambios',
			},
			{
				model: Usuarios,
				as: 'isoNcAuditoriaUsuarios',
				include: [
					{
						model: Personal,
						as: 'personal',
						attributes: ['Nombre', 'Apellido'],
					},
				],
			},
			{
				model: IsoNc,
				as: 'isoNcAuditoriaIsoNC',
				attributes: ['NroNC'],
			},
		],
		order: [['Id', 'ASC']],
	});

	return replaceFields({isoNcAuditoriaIsoNcAudicambios: 'cambio', isoNcAuditoriaUsuarios: 'usuario', isoNcAuditoriaIsoNC: 'isoNc'}, auditoriaData.map(a => a.get({plain: true})))
}

export const getAll = async (where) => {
	const { from, to, vtoCumpl } = where
	const whereConditionsToKeep = ["IdRDet", "IdEstado"]
	where = filterAttributes(where, whereConditionsToKeep)
	if (from && to) {
		where.Fecha = {
		  [Op.between]: [from, to]
		};
	} else if (from) {
		where.Fecha = {
		  [Op.gte]: from
		};
	} else if (to) {
		where.Fecha = {
		  [Op.lte]: to
		};
	}
	if (vtoCumpl) {
		const today = new Date().toISOString().split('T')[0];
		where[Op.and] = {
			IdEstado: { [Op.eq]: 1 },
			[Op.and]: sequelize.literal(`DATEDIFF(FechaA, '${today}') < 0`)
		}
	}
	const ISONCs = await IsoNc.findAll({ where, include: [
		{ model: IsoNcTipo, as: 'tipo' },
		{ model: IsoNcOrigen, as: 'origen' },
		{ model: IsoNcEstado, as: 'estado' },
		{ model: Personal, as: 'emisor' },
		{ model: Personal, as: 'det' },
		{ model: Personal, as: 'causa' },
		{ model: Personal, as: 'accion' },
		{ model: Personal, as: 'va' },
		{ model: Personal, as: 'vef' }
	]})
	return ISONCs.map(i => i.get({ plain: true }))
};

export const notifyParticipants = async (ncId) => {
	const nc = await IsoNc.findOne({
			where: { Id: ncId },
			include: [
				{ model: Personal, as: 'emisor', attributes: ['EMail'] },
				{ model: Personal, as: 'det', attributes: ['EMail'] },
				{ model: Personal, as: 'causa', attributes: ['EMail'] },
				{ model: Personal, as: 'accion', attributes: ['EMail'] },
				{ model: Personal, as: 'va', attributes: ['EMail'] },
				{ model: Personal, as: 'vef', attributes: ['EMail'] }
			],
	});

	// Construir destinatarios
	const emails = [
			nc.emisor?.EMail,
			nc.det?.EMail,
			nc.causa?.EMail,
			nc.accion?.EMail,
			nc.va?.EMail,
			nc.vef?.EMail,
	].filter((email) => email);
	const formatedNumber = nc.NroNC.toString().padStart(5, '0')
	const text = `Alta Acción de Mejora Nº ${formatedNumber}`;
	const placeholder = {
		ncNumber: formatedNumber
	}
	const html = replacePlaceholders(placeholder, newIsoNcTemplateHtml)
	await emailService.sendEmail(emails, text, html, text)
};
