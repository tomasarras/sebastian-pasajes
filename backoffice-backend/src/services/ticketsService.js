import { Ticket } from "../db/index.js"
export const getAll = async () => {
	const tickets = await Ticket.findAll()
	return tickets
};
