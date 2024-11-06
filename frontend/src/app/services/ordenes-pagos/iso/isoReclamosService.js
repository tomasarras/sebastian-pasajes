import axios from '../interceptors'

export const getAllReclamosCoorporativos = (params) => {
  return axios.get(`/iso/claims/c`)
}

export const getAllReclamosTurismo = (params) => {
  return axios.get(`/iso/claims/t`)
}
