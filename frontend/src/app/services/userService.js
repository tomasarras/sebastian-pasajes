import axios from './interceptors'
import { jwtDecode } from "jwt-decode";

export const createUser = (user) => axios.post(`/users/create`, user)

export const changePassword = (currentPassword, newPassword) => {
  const body = { currentPassword, newPassword }
  axios.post(`/users/change-password`, body)
}

export const deleteUser = (userId) => {
  return axios.delete(`/users/${userId}`)
}

export const updateUser = (userId, user) => {
  return axios.put(`/users/${userId}`, user)
}

export const getUsers = () => axios.get(`/users`);

export const getUser = (userId) => axios.get(`/users/${userId}`);

export const login = async (username, password) => {
  const response = await axios.post(`/users/login`, { username, password })
  const { token } = response 
  localStorage.setItem('accessToken', token)
  localStorage.setItem('userInfo', JSON.stringify(jwtDecode(token)))
}