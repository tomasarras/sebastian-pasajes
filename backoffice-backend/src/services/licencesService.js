import { Staff } from "../db/index.js"

export const getAllStaff = async () => {
	const staff = await Staff.findAll()
	return staff
};
