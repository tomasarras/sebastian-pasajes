import { Noticia } from "../db/index.js"
export const getAll = async () => {
	const news = await Noticia.findAll()
	return news.map(n => n.get({ plain: true }))
};

export const update = async (newId, newParam) => {
	if ("urgente" in newParam)
		newParam.urgente = newParam.urgente ? 1 : 0
    await Noticia.update(newParam, { where: { id: newId }})
    const updatedNew = await Noticia.findByPk(newId)
    return updatedNew.get({ plain: true })
};