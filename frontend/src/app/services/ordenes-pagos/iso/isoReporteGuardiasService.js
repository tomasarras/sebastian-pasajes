import axios from '../interceptors'

export const getAll = () => {
  return axios.get(`/iso/rg`)
}

export const newRg = (rg) => {
  return axios.post(`/iso/rg`, rg)
}

export const getByIdReporteGuardias = (id) => {
  return axios.get(`/iso/rg/${id}`)
}

export const updateReporteGuardias = (id, data) => {
  return axios.put(`/iso/rg/${id}`, data)
}

export const removeReporteGuardias = (id) => {
  return axios.delete(`/iso/rg/${id}`)
}
