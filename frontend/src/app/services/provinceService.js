import axios from "./interceptors"

export const create = (provinceName) => {
  const body = { name: provinceName }
  return axios.post(`/provinces`, body)
}

export const getAll = () => axios.get(`/provinces`)