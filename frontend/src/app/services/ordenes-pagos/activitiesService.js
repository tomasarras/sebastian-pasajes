import axios from './interceptors'

export const getAll = (params) => {
  return axios.get(`/activities`)
}

