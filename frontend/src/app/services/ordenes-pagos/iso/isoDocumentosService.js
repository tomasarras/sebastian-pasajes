import { applyFilterParams } from "@/app/utils/utils";
import axios from "../interceptors";

export const getAllDocumentos = (options) => axios.get('/iso/docs/iso?' + applyFilterParams(options));

export const getAllDocumentosEstados = () => axios.get('/iso/docs/estados');

export const getAllDocumentosProcesos = () => axios.get('/iso/docs/procesos');

export const getDocumentoById = (id) => axios.get(`/iso/documentos/${id}`);

export const createDocumento = (documento) => axios.post('/iso/documentos', documento);

export const updateDocumento = (id, documento) => axios.put(`/iso/documentos/${id}`, documento);

export const deleteDocumento = (id) => axios.delete(`/iso/documentos/${id}`); 