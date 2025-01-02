import axios from './interceptors'

export const getParameters = () => {
  return axios.get(`/parameters`)
}

export const updateParameters = (newParameters) => {
  return axios.put(`/parameters`, newParameters)
}