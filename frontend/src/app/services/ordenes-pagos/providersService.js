import axios from 'axios'

export const getAll = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/providers`)
}

