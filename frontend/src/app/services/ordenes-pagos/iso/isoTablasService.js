import axios from '../interceptors'

// Criterios
export const getAllCriterios = () => {
  return axios.get(`/iso/criterias`)
}

export const newCriterio = (cr) => {
  return axios.post(`/iso/criterias`, cr)
}

export const getByIdCriterio = (id) => {
  return axios.get(`/iso/criterias/${id}`)
}

export const updateCriterio = (id, data) => {
  return axios.put(`/iso/criterias/${id}`, data)
}

export const removeCriterio = (id) => {
  return axios.delete(`/iso/criterias/${id}`)
}

// Formadores
export const getAllFormadores = () => {
  return axios.get(`/iso/formadores`)
}

export const nerFormador = (fr) => {
  return axios.post(`/iso/formadores`, fr)
}

export const getByIdFormador = (id) => {
  return axios.get(`/iso/formadores/${id}`)
}

export const updateFormador = (id, data) => {
  return axios.put(`/iso/formadores/${id}`, data)
}

export const removeFormador = (id) => {
  return axios.delete(`/iso/formadores/${id}`)
}

// Origenes
export const getAllOrigenes = () => {
  return axios.get(`/iso/nc/origins`)
}

export const newOrigen = (or) => {
  return axios.post(`/iso/nc/origins`, or)
}

export const getByIdOrigen = (id) => {
  return axios.get(`/iso/nc/origins/${id}`)
}

export const updateOrigen = (id, data) => {
  return axios.put(`/iso/nc/origins/${id}`, data)
}

export const removeOrigen = (id) => {
  return axios.delete(`/iso/nc/origins/${id}`)
}

// Procesos
export const getAllProcesos = () => {
  return axios.get(`/iso/procesos`)
}

export const newProceso = (pr) => {
  return axios.post(`/iso/procesos`, pr)
}

export const getByIdProceso = (id) => {
  return axios.get(`/iso/procesos/${id}`)
}

export const updateProceso = (id, data) => {
  return axios.put(`/iso/procesos/${id}`, data)
}

export const removeProceso = (id) => {
  return axios.delete(`/iso/procesos/${id}`)
}

// Docs
export const getAllDocs = () => {
  return axios.get(`/iso/docs`)
}

export const newDoc = (doc) => {
  return axios.post(`/iso/docs`, doc)
}

export const getByIdDoc = (id) => {
  return axios.get(`/iso/docs/${id}`)
}

export const updateDoc = (id, data) => {
  return axios.put(`/iso/docs/${id}`, data)
}

export const removeDoc = (id) => {
  return axios.delete(`/iso/docs/${id}`)
}

// Curso Temas
export const getAllCursoTemas = () => {
  return axios.get(`/iso/courses/temas`)
}

export const newCursoTemas = (course) => {
  return axios.post(`/iso/courses/temas`, course)
}

export const getAllCursoProgramacion = () => {
  return axios.get(`/iso/courses/programacion`)
}

export const deleteCursoProgramacion = (id) => {
  return axios.delete(`/iso/courses/programacion/${id}`)
}

export const getByIdCursoTema = (id) => {
  return axios.get(`/iso/courses/temas/${id}`)
}

export const updateCursoTema = (id, data) => {
  return axios.put(`/iso/courses/temas/${id}`, data)
}

export const removeCursoTema = (id) => {
  return axios.delete(`/iso/courses/temas/${id}`)
}
