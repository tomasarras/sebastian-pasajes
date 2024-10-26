import axios from 'axios'

export const updateCurrentNew = (neww) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.put(`${url}/news/${neww.id}`, neww)
}

