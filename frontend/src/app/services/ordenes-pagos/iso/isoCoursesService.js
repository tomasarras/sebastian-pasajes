import axios from '../interceptors'

export const getAll = (params) => {
  return axios.get(`/iso/courses`)
}

export const newCourse = (course) => {
  return axios.post(`/iso/courses`, course)
}

export const getById = (id) => {
  return axios.get(`/iso/courses/${id}`)
}

export const update = (id, data) => {
  return axios.put(`/iso/courses/${id}`, data)
}

export const remove = (id) => {
  return axios.delete(`/iso/courses/${id}`)
}

