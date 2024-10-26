import axios from 'axios'

export const getAllEvaluationEjecutivoVentas = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/evaluations/sells`)
}

export const getAllEvaluationEjecutivoVentasCoorporativo = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/evaluations/evc`)
}
export const getAllEvaluationAdministrativo = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/evaluations/adm`)
}

