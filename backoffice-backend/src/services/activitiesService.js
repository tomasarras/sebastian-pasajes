import { Activity } from "../db/index.js"
export const getAll = async () => {
	//TODO ver si meter estos tres llamados en uno
	const activities = await Activity.findAll()
	return activities
};
