import axios from '../interceptors'

export const getAll = () => {
  return axios.get(`/iso/indicadores`)
}

export const newInd = (ind) => {
  return axios.post(`/iso/indicadores`, ind)
}

export const getById = (id) => {
  return axios.get(`/iso/indicadores/${id}`)
}

export const update = (id, data) => {
  return axios.put(`/iso/indicadores/${id}`, data)
}

export const remove = (id) => {
  return axios.delete(`/iso/indicadores/${id}`)
}

