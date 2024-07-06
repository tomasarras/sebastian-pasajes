import axios from './interceptors'

export const getAllGroups = () => axios.get(`/groups`)

export const create = (groupName) => {
  const body = { name: groupName }
  return axios.post(`/groups`, body)
}