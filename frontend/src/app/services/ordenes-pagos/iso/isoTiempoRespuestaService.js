import axios from '../interceptors'

export const getAllTiempoRespuesta = () => {
  return axios.get(`/iso/tiempo-respuesta`)
}

export const newTiempoRespuesta = (tr) => {
  return axios.post(`/iso/tiempo-respuesta`, tr)
}

export const getByIdTiempoRespuesta = (id) => {
  return axios.get(`/iso/tiempo-respuesta/${id}`)
}

export const updateTiempoRespuesta = (id, data) => {
  return axios.put(`/iso/tiempo-respuesta/${id}`, data)
}

export const removeTiempoRespuesta = (id) => {
  return axios.delete(`/iso/tiempo-respuesta/${id}`)
}
