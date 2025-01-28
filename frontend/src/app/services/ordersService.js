import axios from "./interceptors"

export const getOrders = (params) => {
  if (!params)
    return axios.get(`/orders`)

  let url = "/orders?" + joinOrderParams(params)
  console.log(url);
  
  return axios.get(url)
}

export const getOrder = (orderId) => axios.get(`/orders/${orderId}`)

export const create = (order) => axios.post(`/orders`, order)

export const editOrder = (orderId, order) => {
  return axios.put(`/orders/${orderId}`, order)
}

export const deleteOrder = (orderId) => {
  return axios.delete(`/orders/${orderId}`)
}

export const authorizeOrder = (orderId) => {
  return axios.put(`/orders/${orderId}/authorize`)
}

export const rejectOrder = (orderId) => {
  return axios.put(`/orders/${orderId}/reject`)
}

export const closeOrder = (orderId) => {
  return axios.put(`/orders/${orderId}/close`)
}

export const cancelOrder = (orderId) => {
  return axios.put(`/orders/${orderId}/cancel`)
}

export const openOrder = (orderId) => {
  return axios.put(`/orders/${orderId}/open`)
}

export const downloadExcel = async (params) => {
  const startDownload = async (url) => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'archivo.xls');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  if (!params)
    return startDownload('/orders/to-excel')

  let url = "/orders/to-excel?" + joinOrderParams(params)
  console.log(url);
  return startDownload(url)
};

export const downloadPlanilla = async (params) => {
  const startDownload = async (url) => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'planilla.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  if (!params)
    return startDownload('/orders/to-planilla')

  let url = "/orders/to-planilla?" + joinOrderParams(params)
  console.log(url);
  return startDownload(url)
};

function joinOrderParams(params) {
  const queryParams = []

  if (params.number) {
    queryParams.push(`number=${encodeURIComponent(params.number)}`)
  }

  if (params.transportType?.length > 0) {
    queryParams.push(`transportType=${params.transportType.join(',')}`)
  }
  
  if (params.passengerType?.value?.length > 0) {
    queryParams.push(`passengerType=${params.passengerType.value.join(',')}`)
  }

  if (params.status?.value?.length > 0) {
    queryParams.push(`status=${params.status.value.join(',')}`)
  }

  if (params.firstName) {
    queryParams.push(`firstName=${encodeURIComponent(params.firstName)}`)
  }

  if (params.lastName) {
    queryParams.push(`lastName=${encodeURIComponent(params.lastName)}`)
  }

  if (params.document) {
    queryParams.push(`document=${encodeURIComponent(params.document)}`)
  }

  if (params.client?.value?.id) {
    queryParams.push(`clientId=${params.client.value.id}`)
  }

  if (params.registrationDate) {
    if (typeof params.registrationDate === 'string') {
      queryParams.push(`from=${params.registrationDate}`)
      queryParams.push(`to=${params.registrationDate}`)
    } else if (params.registrationDate.value) {
      queryParams.push(`from=${params.registrationDate.value.from}`)
      queryParams.push(`to=${params.registrationDate.value.to}`)
    }
  }
  return queryParams.join('&')
}

export const downloadPdf = (orderId, orderNumber, client) => {
  const startDownload = async (url) => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', `orden_${orderNumber}-${client}.pdf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  return startDownload(`/orders/${orderId}/pdf`)
};