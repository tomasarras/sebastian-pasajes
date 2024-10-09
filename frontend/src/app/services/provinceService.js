import axios from "./interceptors"

export const create = (province) => axios.post(`/provinces`, province)

export const getAll = () => axios.get(`/provinces`)

export const deleteById = (id) => axios.delete(`/provinces/${id}`)

export const edit = (province) => axios.put(`/provinces/${province.id}`, province)