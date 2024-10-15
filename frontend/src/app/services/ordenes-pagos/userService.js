import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export const createUser = (user) => axios.post(`/users/create`, user)

export const changePassword = (currentPassword, newPassword) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  const body = { currentPassword, newPassword }
  axios.post(`${url}/users/change-password`, body)
}

export const login = async (username, password) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  const response = await axios.post(`${url}/users/login`, { username, password })
  const { token } = response 
  localStorage.setItem('opAccessToken', token)
  localStorage.setItem('opUserInfo', JSON.stringify(jwtDecode(token)))
}