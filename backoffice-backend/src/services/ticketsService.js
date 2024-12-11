import { PasajesDev, Personal } from "../db/index.js"
import { replaceFields } from "../utils/functions.js";

export const getAll = async () => {
	const tickets = await PasajesDev.findAll({ include: [{ model: Personal, as: "pasajesDevPersonal" }] })
	return replaceFields({pasajesDevPersonal: "personal"}, tickets.map(t => t.get({ plain: true })))
};

export const create = async (ticketData) => {
	// Establecemos la fecha actual
	ticketData.Fecha = new Date().toISOString().split('T')[0];
	
	// Estado inicial pendiente (1)
	ticketData.Estado = 1;
	
	// Obtenemos el siguiente ID
	const maxId = await PasajesDev.max('Id');
	ticketData.Id = maxId + 1;
	
	const newTicket = await PasajesDev.create(ticketData);
	
	// Recuperamos el ticket creado con sus relaciones
	const createdTicket = await PasajesDev.findByPk(newTicket.Id, {
		include: [{ model: Personal, as: "pasajesDevPersonal" }]
	});

	return replaceFields(
		{pasajesDevPersonal: "personal"}, 
		[createdTicket.get({ plain: true })]
	)[0];
};

export const update = async (ticketId, ticketData) => {
	const ticket = await PasajesDev.findByPk(ticketId);
	if (!ticket) {
		throw new Error('Ticket no encontrado');
	}

	await PasajesDev.update(ticketData, { where: { Id: ticketId }});
	
	// Recuperamos el ticket actualizado con sus relaciones
	const updatedTicket = await PasajesDev.findByPk(ticketId, {
		include: [{ model: Personal, as: "pasajesDevPersonal" }]
	});

	return replaceFields(
		{pasajesDevPersonal: "personal"}, 
		[updatedTicket.get({ plain: true })]
	)[0];
};

export const deleteById = async (ticketId) => {
	const ticket = await PasajesDev.findByPk(ticketId);
	if (!ticket) {
		throw new Error('Ticket no encontrado');
	}

	// Solo permitimos eliminar tickets pendientes
	if (ticket.Estado !== "PENDIENTE") {
		throw new Error('Solo se pueden eliminar tickets en estado pendiente');
	}

	await PasajesDev.destroy({ where: { Id: ticketId }});
	return ticket.get({ plain: true });
};

export const approveById = async (ticketId) => {
    const ticket = await PasajesDev.findByPk(ticketId);
    if (!ticket) {
        throw new Error('Ticket no encontrado');
    }

    // Solo se pueden aprobar tickets pendientes
    if (ticket.Estado !== "PENDIENTE") {
        throw new Error('Solo se pueden aprobar tickets en estado pendiente');
    }

    await PasajesDev.update(
        { Estado: 2 }, // Estado aprobado
        { where: { Id: ticketId }}
    );

    // Recuperamos el ticket actualizado con sus relaciones
    const approvedTicket = await PasajesDev.findByPk(ticketId, {
        include: [{ model: Personal, as: "pasajesDevPersonal" }]
    });

    return replaceFields(
        {pasajesDevPersonal: "personal"}, 
        [approvedTicket.get({ plain: true })]
    )[0];
};

export const rejectById = async (ticketId) => {
    const ticket = await PasajesDev.findByPk(ticketId);
    if (!ticket) {
        throw new Error('Ticket no encontrado');
    }

    // Solo se pueden rechazar tickets aprobados
    if (ticket.Estado !== "APROBADO") {
        throw new Error('Solo se pueden rechazar tickets en estado aprobado');
    }

    await PasajesDev.update(
        { Estado: 1 }, // Estado pendiente
        { where: { Id: ticketId }}
    );

    // Recuperamos el ticket actualizado con sus relaciones
    const rejectedTicket = await PasajesDev.findByPk(ticketId, {
        include: [{ model: Personal, as: "pasajesDevPersonal" }]
    });

    return replaceFields(
        {pasajesDevPersonal: "personal"}, 
        [rejectedTicket.get({ plain: true })]
    )[0];
};
