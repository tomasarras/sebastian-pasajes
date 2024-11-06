import axios from './interceptors'

export const getNews = () => {
  return axios.get(`/news`)
}

