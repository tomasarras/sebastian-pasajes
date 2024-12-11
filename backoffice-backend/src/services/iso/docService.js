import { Op } from "sequelize";
import { IsoDocTipo, IsoDoc, IsoDocEstados, IsoProcesos, IsoDocDist } from "../../db/index.js"
import { replaceFields } from "../../utils/functions.js";
import { ISO_DOC_ESTADO } from "../../utils/constants.js";
export const getAll = async () => {
	const docs = await IsoDocTipo.findAll({ where: { Id: {[Op.ne]: 0 }} })
	return docs.map(d => d.get({ plain: true }))
};

export const getAllIsoDoc = async (where = {}, idPuesto = null) => {
	if (!("Id" in where))
		where.Id = { [Op.ne]: 0 }
	if ("Nombre" in where) {
		where.Nombre = { [Op.like]: `%${where.Nombre}%` }
	}
	if (("IdEstado" in where)) {// Si no especifico estado, entonces filtra los obsoletos
		where.IdEstado = { [Op.ne]: ISO_DOC_ESTADO.OBSOLETO }
	} else {
		if (where.IdEstado != ISO_DOC_ESTADO.OBSOLETO) { // Si agrego estado que no es obsoleto, le agrega obsoleto al que ya eligio
			where.IdEstado = { [Op.in] : [where.IdEstado, ISO_DOC_ESTADO.OBSOLETO] }
		}
	}
  const isoDocDistModel = { model: IsoDocDist, as: 'isoDocIsoDocDist' }
  if (idPuesto) {
    isoDocDistModel.where = { IdPuesto: idPuesto }
  }
  const docs = await IsoDoc.findAll({
    where,
    include: [
      { model: IsoDocTipo, as: 'isoDocIsoDocTipo' },
      { model: IsoDocEstados, as: 'isoDocIsoDocEstados' },
      { model: IsoProcesos, as: 'isoDocIsoDocProcesos' },
      isoDocDistModel
    ],
  });
  return replaceFields({isoDocIsoDocTipo: 'tipo', isoDocIsoDocEstados: 'estado', isoDocIsoDocProcesos:'proceso', isoDocIsoDocDist: 'isoDocDists' }, docs.map(d => d.get({ plain: true })));
};

export const getAllIsoProcesos = async () => {
  const procesos = await IsoProcesos.findAll({where: { Id: {[Op.ne]: 0}}});
  return procesos.map(d => d.get({ plain: true }));
};

export const getAllIsoDocEstados = async () => {
  const estados = await IsoDocEstados.findAll({where: { Id: {[Op.ne]: 0}}});
  return estados.map(d => d.get({ plain: true }));
};
