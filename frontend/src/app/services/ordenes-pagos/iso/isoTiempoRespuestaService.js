import axios from 'axios'

export const getAllTiempoRespuesta = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/times-responses`)
}
