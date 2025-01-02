import { applyFilterParams } from '../utils/utils'
import axios from './interceptors'

export const getAllClients = (options) => {
  const params = applyFilterParams(options)
  return axios.get(`/clients?${params}`)
}

export const createClient = (client) => axios.post(`/clients`, client)

export const editClient = (client) => axios.put(`/clients/${client.id}`, client)

export const deleteClient = (clientId) => axios.delete(`/clients/${clientId}`)

export const downloadExcel = async (options) => {
  const startDownload = async (url) => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'clientes.xls');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  if (!options)
    return startDownload('/clients/to-excel')

  const params = applyFilterParams(options)
  let url = "/clients/to-excel?" + params
  return startDownload(url)
};
