import axios from './interceptors'

export const getAllLocations = () => axios.get(`/locations`)

export const create = (location) => axios.post(`/locations`, location)