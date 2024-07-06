import axios from "./interceptors";

export const getPassengersBy = (findBy) => {
  const params = Object.keys(findBy)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(findBy[key])}`)
    .join('&');
  return axios.get(`/passengers?${params}`)
}
