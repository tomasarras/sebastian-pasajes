import axios from "./interceptors"

export const get = () => axios.get(`/company`)

export const getWelcome = () => axios.get(`/company/welcome`)

export const update = (company) => axios.put(`/company`, company)