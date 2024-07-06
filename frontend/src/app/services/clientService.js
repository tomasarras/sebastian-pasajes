import axios from './interceptors'

export const getAllClients = () => axios.get(`/clients`)

export const createClient = (client) => axios.post(`/clients`, client)
