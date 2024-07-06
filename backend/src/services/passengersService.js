import { StatusCodes } from "http-status-codes";
import { Passenger } from "../db/index.js"

export const getAll = async (whereParams, user) => {
	const passengers = await Passenger.findAll({ where: {
        ...whereParams,
        clientId: user.client.id
    }})
    return passengers.map(passenger => passenger.get({ plain: true }))
};