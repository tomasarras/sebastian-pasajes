import { Client } from "../db/index.js"

export const getAll = async () => {
	const clients = await Client.findAll()
	return clients
};