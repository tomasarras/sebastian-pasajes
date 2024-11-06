import axios from '../interceptors'

export const getAllEvaluationEjecutivoVentas = (params) => {
  return axios.get(`/iso/evaluations/sells`)
}

export const getAllEvaluationEjecutivoVentasCoorporativo = (params) => {
  return axios.get(`/iso/evaluations/evc`)
}
export const getAllEvaluationAdministrativo = (params) => {
  return axios.get(`/iso/evaluations/adm`)
}

