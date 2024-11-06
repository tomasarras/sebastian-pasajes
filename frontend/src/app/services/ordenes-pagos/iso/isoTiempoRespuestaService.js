import axios from '../interceptors'

export const getAllTiempoRespuesta = (params) => {
  return axios.get(`/iso/times-responses`)
}
