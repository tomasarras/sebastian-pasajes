import axios from "./interceptors"

export const getOrders = () => axios.get(`/orders`)

export const create = (order) => axios.post(`/orders`, order)