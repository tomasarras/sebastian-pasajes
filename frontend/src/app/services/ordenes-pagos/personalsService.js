import axios from './interceptors'


export const getAll = (params) => {
  return axios.get(`/staff`, {
    params
  })
}

export const requestLicences = () => {
  return axios.post(`/staff/licences/request-licences`, {})
}

export const getAllLicencias = (idPersonal) => {
  return axios.get(`/staff/licences?idPersonal=${idPersonal}`)
}

export const verificarLicencias = async (idPersonal) => {
  return axios.get(`/staff/licences/verify-licences?idPersonal=${idPersonal}`)
}

export const getMyLicencias = () => {
  return axios.get(`/staff/licences`)
}

export const newLicencia = (licencia) => {
  return axios.post(`/staff/licences`, licencia)
}

export const deleteLicencia = (idLicencia) => {
  return axios.delete(`/staff/licences/${idLicencia}`)
}

export const approveLicencias = (licenciasId) => {
  return axios.put(`/staff/licences/approve`, { licencesId : licenciasId })
}

export const rejectLicencias = (licenciasId) => {
  return axios.put(`/staff/licences/reject`, { licencesId : licenciasId })
}
