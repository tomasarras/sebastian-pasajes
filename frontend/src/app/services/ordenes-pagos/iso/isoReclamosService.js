import axios from 'axios'

export const getAllReclamosCoorporativos = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/claims/c`)
}

export const getAllReclamosTurismo = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/claims/t`)
}
