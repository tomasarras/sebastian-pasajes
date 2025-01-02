import { applyFilterParams } from '@/app/utils/utils';
import axios from './interceptors'


export const getAll = (params) => {
  return axios.get(`/payment-orders?${applyFilterParams(params)}`)
}

export const createOrder = (orderData) => {
    return axios.post('/payment-orders/', orderData);
};

export const updateOrder = (orderId, orderData) => {
    return axios.put(`/payment-orders/${orderId}`, orderData);
};

export const deleteOrder = (orderId) => {
    return axios.delete(`/payment-orders/${orderId}`);
};

export const uploadFile = (orderId, formData) => {
  axios({
    method: "post",
    url: `/payment-orders/${orderId}/file`,
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  })
};

export const deleteFile = (fileId) => {
  return axios.delete(`/payment-orders/file/${fileId}`);
};

export const downloadFile = async (file) => {
  try {
    const response = await axios({
      url: `/payment-orders/file/${file.id}`,
      method: 'GET',
      responseType: 'blob',
      validateStatus: null,
    });
    // Crear URL del blob
    const href = URL.createObjectURL(response);

    // Crear elemento anchor temporal
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', file.ruta);

    // Agregar al DOM, hacer click y remover
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Limpiar la URL creada
    URL.revokeObjectURL(href);
  } catch (error) {
    console.error('Error al descargar el archivo:', error);
    throw error;
  }
};

export const notifyOrder = (orderId) => {
  return axios.post(`/payment-orders/${orderId}/notify`);
};
