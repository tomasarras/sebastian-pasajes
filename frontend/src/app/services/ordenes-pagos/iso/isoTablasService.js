import axios from 'axios'

export const getAllCriterios = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/criterias`)
}

export const getAllFormadores = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/formadores`)
}

export const getAllOrigenes = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/nc/origins`)
}

export const getAllProcesos = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/procesos`)
}

export const getAllDocs = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/docs`)
}

export const getAllCursoTemas = (params) => {
  const url = process.env.NEXT_PUBLIC_ORDENES_PAGOS_SERVER_BASE_URL
  return axios.get(`${url}/iso/courses/temas`)
}
