import axios from 'axios'
import { jwtDecode } from "jwt-decode";

export const getNews = () => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/news`)
}

