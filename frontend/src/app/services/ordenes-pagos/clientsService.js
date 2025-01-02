import axios from './interceptors'

export const getAll = (params) => {
  return axios.get(`/clients`);
};

export const createClient = (clientData) => {
  return axios.post(`/clients`, clientData);
};

export const updateClient = (clientId, clientData) => {
  return axios.put(`/clients/${clientId}`, clientData);
};

export const deleteClient = (clientId) => {
  return axios.delete(`/clients/${clientId}`);
};
