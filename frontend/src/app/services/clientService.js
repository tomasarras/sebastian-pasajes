import { applyFilterParams } from '../utils/utils'
import axios from './interceptors'

export const getAllClients = (options) => {
  const params = applyFilterParams(options)
  return axios.get(`/clients?${params}`)
}

export const createClient = (client) => axios.post(`/clients`, client)

export const editClient = (client) => axios.put(`/clients/${client.id}`, client)

export const deleteClient = (clientId) => axios.delete(`/clients/${clientId}`)