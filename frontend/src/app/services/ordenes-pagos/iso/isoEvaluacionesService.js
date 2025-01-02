import axios from '../interceptors'

export const getAllEvaluationEjecutivoVentas = () => {
  return axios.get(`/iso/evaluations/sells`)
}

export const newEvaluationEjecutivoVentas = (ev) => {
  return axios.post(`/iso/evaluations/sells`, ev)
}

export const getByIdEvaluationEjecutivoVentas = (id) => {
  return axios.get(`/iso/evaluations/sells/${id}`)
}

export const updateEvaluationEjecutivoVentas = (id, data) => {
  return axios.put(`/iso/evaluations/sells/${id}`, data)
}

export const removeEvaluationEjecutivoVentas = (id) => {
  return axios.delete(`/iso/evaluations/sells/${id}`)
}



export const getAllEvaluationEjecutivoVentasCoorporativo = () => {
  return axios.get(`/iso/evaluations/evc`)
}

export const newEvaluationEjecutivoVentasCoorporativo = (ev) => {
  return axios.post(`/iso/evaluations/evc`, ev)
}

export const getByIdEvaluationEjecutivoVentasCoorporativo = (id) => {
  return axios.get(`/iso/evaluations/evc/${id}`)
}

export const updateEvaluationEjecutivoVentasCoorporativo = (id, data) => {
  return axios.put(`/iso/evaluations/evc/${id}`, data)
}

export const removeEvaluationEjecutivoVentasCoorporativo = (id) => {
  return axios.delete(`/iso/evaluations/evc/${id}`)
}



export const getAllEvaluationAdministrativo = () => {
  return axios.get(`/iso/evaluations/adm`)
}

export const newEvaluationAdministrativo = (ev) => {
  return axios.post(`/iso/evaluations/adm`, ev)
}

export const getByIdEvaluationAdministrativo = (id) => {
  return axios.get(`/iso/evaluations/adm/${id}`)
}

export const updateEvaluationAdministrativo = (id, data) => {
  return axios.put(`/iso/evaluations/adm/${id}`, data)
}

export const removeEvaluationAdministrativo = (id) => {
  return axios.delete(`/iso/evaluations/adm/${id}`)
}

