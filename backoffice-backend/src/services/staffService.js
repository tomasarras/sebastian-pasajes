import { Personal, Puesto, PersonalLicencias, LicenciasTipo, Feriados, PersonalLicxAnio, Parametros } from "../db/index.js"
import { EMPTY_PERSONAL } from "../utils/constants.js";
import { Op } from 'sequelize';
import { newId, replaceFields } from "../utils/functions.js";

export const getAll = async (where) => {
	const { search, active, Id } = where
	delete where.search
	delete where.active
    const skipIds = [EMPTY_PERSONAL]
	if (active !== undefined) {
		where.FechaBaja = { [active === "true" ? Op.ne : Op.eq]: "0000-00-00" }
	}
    if (search) {
        where[Op.or] = [
                { Nombre: { [Op.like]: `%${search}%` } },
                { Apellido: { [Op.like]: `%${search}%` } },
            ]
    }
    where.Id = Id == undefined ? { [Op.notIn]: skipIds } : Id;
	const staffs = await Personal.findAll({ where, include: [{ model: Puesto, as: "puesto" }] })
	return staffs.map(s => s.get({plain:true}))
};

export const getAllLicences = async (where) => {
    const feriados = await Feriados.findAll()
	const licences = await PersonalLicencias.findAll({ where, include: [
        { model: Personal, as: "personalLicenciasPersonal" },
        { model: LicenciasTipo, as: "personalLicenciasPersonalTipo" },
    ] })
    let response = replaceFields({personalLicenciasPersonal:'personal',personalLicenciasPersonalTipo:'tipo'}, licences.map(s => s.get({plain:true})))
    response.forEach(licencia => {
        const feriado = feriados.find(feriado => feriado.Fecha === licencia.Fecha)
        if (feriado)
            licencia.feriado = feriado.get({ plain: true })
    })
    return response
};

export const getMyLicencias = async (idPersonal) => {
    const feriados = await Feriados.findAll()
	const licences = await PersonalLicencias.findAll({ where: { IdPersonal: idPersonal }, include: [
        { model: Personal, as: "personalLicenciasPersonal" },
        { model: LicenciasTipo, as: "personalLicenciasPersonalTipo" },
    ] })
    let response = replaceFields({personalLicenciasPersonal:'personal',personalLicenciasPersonalTipo:'tipo'}, licences.map(s => s.get({plain:true})))
    response.forEach(licencia => {
        const feriado = feriados.find(feriado => feriado.Fecha === licencia.Fecha)
        if (feriado)
            licencia.feriado = feriado.get({ plain: true })
    })
    return response
};

export const newLicence = async ({idPersonal, fecha}) => {
    const id = await newId(PersonalLicencias);
	await PersonalLicencias.create({
        Id: id,
        IdPersonal: idPersonal,
        IdLic: 1,
        Fecha: fecha,
        IdEstado: 0,
    })
    const licenceDb = await PersonalLicencias.findOne({ where: {Id: id}, include: [
        { model: Personal, as: "personalLicenciasPersonal" },
        { model: LicenciasTipo, as: "personalLicenciasPersonalTipo" },
    ] })
    const [response] = replaceFields({personalLicenciasPersonal:'personal',personalLicenciasPersonalTipo:'tipo'}, [licenceDb.get({plain: true})])
    return response
};

export const deleteLicence = async (idLicence) => {
	return PersonalLicencias.destroy({ where: { Id: idLicence } })
};

export const verifyLicences = async (idPersonal) => {
	let result = await PersonalLicxAnio.findAll({ where: { IdPersonal: idPersonal } })
    result = result.map(r => r.get({ plain: true }))
    for (let r of result) {
        r.used = await calcularDiasGozados(r.año, idPersonal)
        r.saldo = r.Dias - r.used
    }
    return result
};

export const requestLicences = async (idPersonal) => {
	const p = await Personal.findOne({ where: { Id: idPersonal } })
    const personalFullName = p.Apellido + " " + p.Nombre
    const parameters = await Parametros.findOne({ where: { Id:1 }, attributes: ["EMail2"]})
    const email = parameters.EMail2
    const title = 'Solicitud de Licencias ' +  personalFullName
	const body = '<BODY><FONT FACE="arial">'+personalFullName+' ha enviado una solicitud de aprobaci&oacute;n de licencias.</FONT></BODY>';
    return p
};

export const approveLicences = async (licencesId) => {
    return PersonalLicencias.update(
      { IdEstado: 1 },
      { where: { Id: { [Op.in]: licencesId } } }
    );
};

export const rejectLicences = async (licencesId) => {
    return PersonalLicencias.destroy({ where: { Id: { [Op.in]: licencesId } } });
};

async function obtenerDiasUsados(personalId) {
    return await PersonalLicencias.count({
      where: { IdPersonal: personalId, IdEstado: 1 }
    });
}
  
async function obtenerCantidadAnios(personalId) {
    return await PersonalLicxAnio.count({ where: { IdPersonal: personalId } });
}

async function obtenerAnioMinimo(personalId) {
    return await PersonalLicxAnio.min('Año', { where: { IdPersonal: personalId } });
}

async function obtenerDiasPorAnio(personalId, anio) {
    const resultado = await PersonalLicxAnio.findOne({
        where: { IdPersonal: personalId, Año: anio },
        attributes: ['Dias']
    });
    return resultado ? resultado.Dias : 0;
}

async function calcularDiasGozados(anioConsulta, personalId) {
    let diasUsados = await obtenerDiasUsados(personalId);
    const cantAnios = await obtenerCantidadAnios(personalId);
    let anioFor = await obtenerAnioMinimo(personalId);
    let diasFuncion = 0;

    for (let i = 0; i < cantAnios; i++) {
        const diasDisponibles = await obtenerDiasPorAnio(personalId, anioFor);

        // Calcula los días gozados para el año actual
        const diasAnio = Math.min(diasDisponibles, diasUsados);
        diasUsados -= diasAnio;

        // Si es el año consultado, guarda los días y termina el bucle
        if (anioFor === anioConsulta) {
            diasFuncion = diasAnio;
            break;
        }

        // Si ya no hay días usados restantes, termina el bucle
        if (diasUsados <= 0) break;

        // Incrementa el año
        anioFor++;
    }

    return diasFuncion;
}
