import { ISOCourses } from "../db/index.js"
export const getAll = async () => {
	const courses = await ISOCourses.findAll()
	return courses
};
