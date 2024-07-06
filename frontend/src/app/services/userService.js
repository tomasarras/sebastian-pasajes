import axios from './interceptors'
import { jwtDecode } from "jwt-decode";

export const createUser = (user) => axios.post(`/users/create`, user)

export const changePassword = (currentPassword, newPassword) => {
  const body = { currentPassword, newPassword }
  axios.post(`/users/change-password`, body)
}

export const login = async (username, password) => {
  const response = await axios.post(`/users/login`, { username, password })
  const { token } = response 
  localStorage.setItem('accessToken', token)
  localStorage.setItem('userInfo', JSON.stringify(jwtDecode(token)))
}