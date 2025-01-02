import axios from './interceptors'

export const getAll = (params) => {
  return axios.get(`/tickets`)
}

export const createPasaje = (pasajeData) => {
    return axios.post('/tickets', pasajeData);
};

export const updatePasaje = (pasajeId, pasajeData) => {
    return axios.put(`/tickets/${pasajeId}`, pasajeData);
};

export const deletePasaje = (pasajeId) => {
    return axios.delete(`/tickets/${pasajeId}`);
};

export const approvePasaje = (pasajeId) => {
    return axios.put(`/tickets/${pasajeId}/approve`);
};

export const cancelPasaje = (pasajeId) => {
    return axios.put(`/tickets/${pasajeId}/cancel`);
};
