import axios from "./interceptors"

export const getOrders = () => axios.get(`/orders`)

export const getOrder = (orderId) => axios.get(`/orders/${orderId}`)

export const create = (order) => axios.post(`/orders`, order)

export const editOrder = (orderId, order) => {
  return axios.put(`/orders/${orderId}`, order)
}

export const deleteOrder = (orderId) => {
  return axios.delete(`/orders/${orderId}`)
}