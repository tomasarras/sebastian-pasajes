import axios from './interceptors'

export const getAllGroups = () => axios.get(`/groups`)

export const getGroup = (groupId) => axios.get(`/groups/${groupId}`)

export const create = (groupName) => {
  const body = { name: groupName }
  return axios.post(`/groups`, body)
}

export const editGroup = (groupId, groupName) => {
  const body = { name: groupName }
  return axios.put(`/groups/${groupId}`, body)
}

export const deleteGroup = (groupId) => {
  return axios.delete(`/groups/${groupId}`)
}