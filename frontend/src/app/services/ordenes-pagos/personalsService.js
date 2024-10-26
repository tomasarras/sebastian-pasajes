import { getOpAuthHeader } from '@/app/utils/utils'
import axios from 'axios'


export const getAll = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/staff`, {
    params
  })
}

export const requestLicences = () => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  const headers = getOpAuthHeader()
  return axios.post(`${url}/staff/licences/request-licences`, {}, headers)
}

export const getAllLicencias = (idPersonal) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  const headers = getOpAuthHeader()
  return axios.get(`${url}/staff/licences?idPersonal=${idPersonal}`, headers)
}

export const verificarLicencias = async (idPersonal) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  const headers = getOpAuthHeader()
  return axios.get(`${url}/staff/licences/verify-licences?idPersonal=${idPersonal}`, headers)
}

export const getMyLicencias = () => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  const headers = getOpAuthHeader()
  return axios.get(`${url}/staff/licences`, headers)
}

export const newLicencia = (licencia) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  const headers = getOpAuthHeader()
  return axios.post(`${url}/staff/licences`, licencia, headers)
}

export const deleteLicencia = (idLicencia) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.delete(`${url}/staff/licences/${idLicencia}`)
}

export const approveLicencias = (licenciasId) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.put(`${url}/staff/licences/approve`, { licencesId : licenciasId })
}

export const rejectLicencias = (licenciasId) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.put(`${url}/staff/licences/reject`, { licencesId : licenciasId })
}
