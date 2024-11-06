import axios from '../interceptors'

export const getAllCor = (params) => {
  return axios.get(`/iso/encuestas/cor`)
}

export const getAllIssn = (params) => {
  return axios.get(`/iso/encuestas/issn`)
}
export const getAllTur = (params) => {
  return axios.get(`/iso/encuestas/tur`)
}

export const getAllTurr = (params) => {
  return axios.get(`/iso/encuestas/turr`)
}

