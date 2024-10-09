import axios from './interceptors'

export const getAllClients = () => axios.get(`/clients`)

export const createClient = (client) => axios.post(`/clients`, client)

export const editClient = (client) => axios.put(`/clients/${client.id}`, client)

export const deleteClient = (clientId) => axios.delete(`/clients/${clientId}`)