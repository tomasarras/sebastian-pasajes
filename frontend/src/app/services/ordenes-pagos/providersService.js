import { applyFilterParams } from '@/app/utils/utils';
import axios from './interceptors'

export const getAll = (params) => {
  return axios.get(`/providers?${applyFilterParams(params)}`)
}

export const createProvider = (providerData) => {
    return axios.post('/providers', providerData);
};

export const updateProvider = (providerId, providerData) => {
    return axios.put(`/providers/${providerId}`, providerData);
};

export const deleteProvider = (providerId) => {
    return axios.delete(`/providers/${providerId}`);
};

