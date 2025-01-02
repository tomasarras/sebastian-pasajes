import { Personal, Puesto, PersonalLicencias, LicenciasTipo, Feriados, PersonalLicxAnio, Parametros } from "../db/index.js"
import { EMPTY_PERSONAL } from "../utils/constants.js";
import { Op } from 'sequelize';
import { formatDate, newId, replaceFields, replacePlaceholders } from "../utils/functions.js";
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url';
import { sendEmail } from "./emailService.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const requestLicencesTemplatePath = path.join(__dirname, '../', 'archivos', 'email', 'request_licences.html');
let requestLicencesTemplateHtml;
fs.readFile(requestLicencesTemplatePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the HTML file:', err);
        return;
    }
    requestLicencesTemplateHtml = data
});

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

export const getAllPuestos = async () => {
	const puestos = await Puesto.findAll({ where: { Id: {[Op.ne]: 0} } })
	return puestos.map(s => s.get({plain:true}))
};

export const createPuesto = async (puestoParam) => {
    const maxId = await Puesto.max('Id');
    puestoParam.Id = maxId +1
	const puesto = await Puesto.create(puestoParam)
	return puesto.get({plain:true})
};

export const deletePuestoById = async (id) => {
	const puesto = await Puesto.findOne({ where: { Id: id } })
	puesto.destroy()
};

export const getAllLicenciasTipo = async () => {
	const licenciasTipo = await LicenciasTipo.findAll({ where: { Id: {[Op.ne]: 0} } })
	return licenciasTipo.map(s => s.get({plain:true}))
};

export const getAllFeriados = async () => {
    const feriados = await Feriados.findAll({ where: { Id: {[Op.ne]: 0} } })
	return feriados.map(s => s.get({plain:true}))
};

export const createFeriado = async (feriadoParam) => {
    const maxId = await Feriados.max('Id');
    feriadoParam.Id = maxId +1
    const feriado = await Feriados.create(feriadoParam)
	return feriado.get({plain:true})
};

export const deleteFeriadoById = async (id) => {
    const feriado = await Feriados.findOne({ where: { Id: id } })
    feriado.destroy()
};

export const deleteLicenciaTipoById = async (id) => {
    const licenciaTipo = await LicenciasTipo.findOne({ where: { Id: id } })
    licenciaTipo.destroy()
};

export const createLicenciaTipo = async (licenciaTipoParam) => {
    const maxId = await LicenciasTipo.max('Id');
    licenciaTipoParam.Id = maxId +1
    const licenciaTipo = await LicenciasTipo.create(licenciaTipoParam)
    return licenciaTipo.get({plain:true})
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

export const newLicenceByYear = async (licenceByYear) => {
    licenceByYear.Id = await newId(PersonalLicxAnio);
	await PersonalLicxAnio.create(licenceByYear)
    return getById(licenceByYear.IdPersonal)
};

export const deleteLicenceByYear = async (licenceId) => {
	const licenceByYear = await PersonalLicxAnio.findOne({ where: { Id: licenceId }})
    licenceByYear.destroy()
    return getById(licenceByYear.IdPersonal)
};

export const deleteLicence = async (idLicence) => {
	return PersonalLicencias.destroy({ where: { Id: idLicence } })
};

export const verifyLicences = async (idPersonal) => {
	let result = await PersonalLicxAnio.findAll({ where: { IdPersonal: idPersonal } })
    result = result.map(r => r.get({ plain: true }))
    for (let r of result) {
        r.used = await calcularDiasGozados(r.Año, idPersonal)
        r.saldo = r.Dias - r.used
    }
    return result
};

export const requestLicences = async (idPersonal) => {
	const p = await Personal.findOne({ where: { Id: idPersonal } })
    const personalFullName = p.Apellido + " " + p.Nombre
    const parameters = await Parametros.findOne({ where: { Id:1 }, attributes: ["EMail2"]})
    const email = parameters.EMail2
    const subject = 'Solicitud de Licencias ' +  personalFullName
    const text = subject
    const placeholders = {
        personalFullName,
    }
    const html = replacePlaceholders(placeholders, requestLicencesTemplateHtml)
    sendEmail(email, subject, html, text)
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

export const create = async (staffData) => {
    // Establecemos la fecha de alta
    staffData.FechaAlta = new Date().toISOString().split('T')[0];
    
    // Obtenemos el siguiente ID
    const maxId = await Personal.max('Id');
    staffData.Id = maxId + 1;
    
    // Convertimos nombre y apellido a mayúsculas
    staffData.Nombre = staffData.Nombre.toUpperCase();
    staffData.Apellido = staffData.Apellido.toUpperCase();
    
    const newStaff = await Personal.create(staffData);
    
    // Recuperamos el personal creado con sus relaciones
    const createdStaff = await Personal.findByPk(newStaff.Id, {
        include: [{ model: Puesto, as: "puesto" }]
    });

    return createdStaff.get({ plain: true });
};

export const update = async (staffId, staffData) => {
    const staff = await Personal.findByPk(staffId);
    if (!staff) {
        throw new Error('Personal no encontrado');
    }

    // Convertimos nombre y apellido a mayúsculas si se proporcionan
    if (staffData.Nombre) {
        staffData.Nombre = staffData.Nombre.toUpperCase();
    }
    if (staffData.Apellido) {
        staffData.Apellido = staffData.Apellido.toUpperCase();
    }

    await Personal.update(staffData, { where: { Id: staffId }});
    
    // Recuperamos el personal actualizado con sus relaciones
    const updatedStaff = await Personal.findByPk(staffId, {
        include: [{ model: Puesto, as: "puesto" }]
    });

    return updatedStaff.get({ plain: true });
};

export const deleteById = async (staffId) => {
    const staff = await Personal.findByPk(staffId);
    if (!staff) {
        throw new Error('Personal no encontrado');
    }

    if (staffId === EMPTY_PERSONAL) {
        throw new Error('No se puede eliminar el personal por defecto');
    }

    // Soft delete: actualizamos la fecha de baja
    const fechaBaja = new Date().toISOString().split('T')[0];
    await Personal.update(
        { FechaBaja: fechaBaja },
        { where: { Id: staffId }}
    );

    const deletedStaff = await Personal.findByPk(staffId, {
        include: [{ model: Puesto, as: "puesto" }]
    });
    return deletedStaff.get({ plain: true });
};

export const getById = async (staffId) => {
    let staff = await Personal.findByPk(staffId);
    if (!staff) {
        throw new Error('Personal no encontrado');
    }
    staff = staff.get({plain: true})
    staff.licencias = await verifyLicences(staffId)
    return staff
};
