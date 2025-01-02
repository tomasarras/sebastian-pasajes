import axios from './interceptors'


export const getAll = (params) => {
  return axios.get(`/staff`, {
    params
  })
}

export const getById = (personalId) => {
  return axios.get(`/staff/${personalId}`)
}

export const createPersonal = (personalData) => {
  return axios.post('/staff', personalData);
};

export const updatePersonal = (personalId, personalData) => {
  return axios.put(`/staff/${personalId}`, personalData);
};

export const deletePersonal = (personalId) => {
  return axios.delete(`/staff/${personalId}`);
};

export const requestLicences = () => {
  return axios.post(`/staff/licences/request-licences`, {})
}

export const getAllPuestos = () => {
  return axios.get(`/staff/puestos`, {})
}

export const createPuesto = (puesto) => {
  return axios.post(`/staff/puestos`, puesto)
}

export const deletePuesto = (id) => {
  return axios.delete(`/staff/puestos/${id}`)
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

export const newLicenciaByYear = (licencia) => {
  return axios.post(`/staff/licences/year`, licencia)
}

export const deleteLicenceByYear = (licenciaId) => {
  return axios.delete(`/staff/licences/year/${licenciaId}`)
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

export const getAllFeriados = () => {
  return axios.get(`/staff/feriados`,)
}

export const createFeriado = (feriado) => {
  return axios.post(`/staff/feriados`, feriado)
}

export const deleteFeriado = (id) => {
  return axios.delete(`/staff/feriados/${id}`,)
}

export const getAllLicenciasTipo = () => {
  return axios.get(`/staff/licences/types`,)
}

export const deleteLicenciaTipo = (id) => {
  return axios.delete(`/staff/licences/types/${id}`)
}

export const createLicenciaTipo = (licenciaTipo) => {
  return axios.post(`/staff/licences/types`, licenciaTipo)
}
