import axios from "axios";

axios.interceptors.response.use((response) => {
    return response.data;
  }, (error) => {
    if (error.response && (error.response.status === 401)) {
      const url = error.request.responseURL
      const urlSplited = url.split('/')
      const isLoginPath = urlSplited[urlSplited.length-1] == 'login'
      if (!isLoginPath) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        window.location.href = "/login?expired";
      }
    }
    return Promise.reject(error);
});

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

axios.defaults.baseURL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export default axios;