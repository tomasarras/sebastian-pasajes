import axios from '../interceptors'

export const getAll = (params) => {
  return axios.get(`/iso/aud`)
}

export const newAuditory = (body) => {
  return axios.post(`/iso/aud`, body)
}

export const getById = (id) => {
  return axios.get(`/iso/aud/${id}`)
}

export const update = (id, data) => {
  return axios.put(`/iso/aud/${id}`, data)
}

export const remove = (id) => {
  return axios.delete(`/iso/aud/${id}`)
}

