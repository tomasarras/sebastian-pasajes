import axios from './interceptors'
import { jwtDecode } from "jwt-decode";

export const changePassword = (currentPassword, newPassword) => {
  const body = { currentPassword, newPassword }
  axios.post(`/users/change-password`, body)
}

export const getAll = () => {
  return axios.get(`/users`)
}

export const login = async (username, password) => {  
  const response = await axios.post(`/users/login`, { username, password })
  const { token } = response 
  localStorage.setItem('opAccessToken', token)
  localStorage.setItem('opUserInfo', JSON.stringify(jwtDecode(token)))
}

export const create = async (user) => {  
  return axios.post(`/users`, user)
}

export const changePasswordAsAdmin = (newPassword, username) => {
  const body = { newPassword }
  return axios.post(`/users/${username}/change-password`, body)
}

export const deleteUser = (username) => {
  return axios.delete(`/users/${username}`)
}