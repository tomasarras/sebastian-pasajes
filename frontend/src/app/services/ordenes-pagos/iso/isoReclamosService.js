import axios from '../interceptors'

export const getAllReclamosCoorporativos = () => {
  return axios.get(`/iso/reclamos/c`)
}

export const newReclamosCoorporativos = (re) => {
  return axios.post(`/iso/reclamos`, re)
}

export const getByIdReclamosCoorporativos = (id) => {
  return axios.get(`/iso/reclamos/c/${id}`)
}

export const updateReclamosCoorporativos = (id, data) => {
  return axios.put(`/iso/reclamos/c/${id}`, data)
}

export const removeReclamosCoorporativos = (id) => {
  return axios.delete(`/iso/reclamos/c/${id}`)
}


export const getAllReclamosTurismo = (params) => {
  return axios.get(`/iso/reclamos/t`)
}

export const newReclamosTurismo = (re) => {
  return axios.post(`/iso/reclamos`, re)
}

export const getByIdReclamosTurismo = (id) => {
  return axios.get(`/iso/reclamos/t/${id}`)
}

export const updateReclamosTurismo = (id, data) => {
  return axios.put(`/iso/reclamos/t/${id}`, data)
}

export const removeReclamosTurismo = (id) => {
  return axios.delete(`/iso/reclamos/t/${id}`)
}
