import axios from './interceptors'

export const getAllLocations = () => axios.get(`/locations`)

export const create = (location) => axios.post(`/locations`, location)

export const deleteById = (id) => axios.delete(`/locations/${id}`)

export const edit = (location) => axios.put(`/locations/${location.id}`, location)