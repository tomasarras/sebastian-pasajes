import { News } from "../db/index.js"
export const getAll = async () => {
	const news = await News.findAll()
	return news
};
