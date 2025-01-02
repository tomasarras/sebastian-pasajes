import axios from '../interceptors'

export const getAll = () => {
  return axios.get(`/iso/minutas`)
}

export const newMin = (min) => {
  return axios.post(`/iso/minutas`, min)
}

export const getById = (id) => {
  return axios.get(`/iso/minutas/${id}`)
}

export const update = (id, data) => {
  return axios.put(`/iso/minutas/${id}`, data)
}

export const remove = (id) => {
  return axios.delete(`/iso/minutas/${id}`)
}

