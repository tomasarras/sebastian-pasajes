import axios from './interceptors'

export const updateCurrentNew = (neww) => {
  return axios.put(`/news/${neww.id}`, neww)
}

