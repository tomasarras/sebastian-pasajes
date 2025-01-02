import axios from '../interceptors'

export const getAllCor = (params) => {
  return axios.get(`/iso/encuestas/cor`)
}

export const newCor = (cor) => {
  return axios.post(`/iso/encuestas/cor`, cor)
}

export const getByIdCor = (id) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/encuestas/cor/${id}`)
}

export const updateCor = (id, data) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.put(`${url}/iso/encuestas/cor/${id}`, data)
}

export const removeCor = (id) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.delete(`${url}/iso/encuestas/cor/${id}`)
}



export const getAllIssn = (params) => {
  return axios.get(`/iso/encuestas/issn`)
}

export const newIssn = (issn) => {
  return axios.post(`/iso/encuestas/issn`, issn)
}

export const getByIdIssn = (id) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/encuestas/issn/${id}`)
}

export const updateIssn = (id, data) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.put(`${url}/iso/encuestas/issn/${id}`, data)
}

export const removeIssn = (id) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.delete(`${url}/iso/encuestas/issn/${id}`)
}



export const getAllTur = (params) => {
  return axios.get(`/iso/encuestas/tur`)
}

export const newTur = (tur) => {
  return axios.post(`/iso/encuestas/tur`, tur)
}

export const getByIdTur = (id) => {
  return axios.get(`/iso/encuestas/tur/${id}`)
}

export const updateTur = (id, data) => {
  return axios.put(`/iso/encuestas/tur/${id}`, data)
}

export const removeTur = (id) => {
  return axios.delete(`/iso/encuestas/tur/${id}`)
}



export const getAllTurr = () => {
  return axios.get(`/iso/encuestas/turr`)
}

export const newTurr = (turr) => {
  return axios.post(`/iso/encuestas/turr`, turr)
}

export const getByIdTurr = (id) => {
  return axios.get(`/iso/encuestas/turr/${id}`)
}

export const updateTurr = (id, data) => {
  return axios.put(`/iso/encuestas/turr/${id}`, data)
}

export const removeTurr = (id) => {
  return axios.delete(`/iso/encuestas/turr/${id}`)
}

