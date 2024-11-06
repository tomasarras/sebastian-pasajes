import axios from '../interceptors'

export const getAllCriterios = (params) => {
  return axios.get(`/iso/criterias`)
}

export const getAllFormadores = (params) => {
  return axios.get(`/iso/formadores`)
}

export const getAllOrigenes = (params) => {
  return axios.get(`/iso/nc/origins`)
}

export const getAllProcesos = (params) => {
  return axios.get(`/iso/procesos`)
}

export const getAllDocs = (params) => {
  return axios.get(`/iso/docs`)
}

export const getAllCursoTemas = (params) => {
  return axios.get(`/iso/courses/temas`)
}
