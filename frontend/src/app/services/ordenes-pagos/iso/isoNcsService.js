import { applyFilterParams } from '@/app/utils/utils';
import axios from '../interceptors'

export const getAll = (options) => {
  const params = applyFilterParams(options)
  return axios.get(`/iso/nc?${params}`)
}

export const newAction = (body) => {
  return axios.post(`/iso/nc`, body)
}

export const getById = (id) => {
  return axios.get(`/iso/nc/${id}`)
}

export const update = (id, data) => {
  return axios.put(`/iso/nc/${id}`, data)
}

export const remove = (id) => {
  return axios.delete(`/iso/nc/${id}`)
}

export const notifyParticipants = (id) => {
  return axios.put(`/iso/nc/notify-participants?ncId=${id}`)
}