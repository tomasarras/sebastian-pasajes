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