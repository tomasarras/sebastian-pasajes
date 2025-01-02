import { applyFilterParams } from '@/app/utils/utils';
import axios from './interceptors'

export const exportLicencias = (options) => {
  const startDownload = async (url) => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'archivo.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  return startDownload('/excel/staff?' + applyFilterParams(options))
}

export const exportAccionesMejora = (id) => {
  const startDownload = async (url) => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'archivo.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  return startDownload('/excel/iso/nc?id=' + id)
}

export const exportRequestLicences = (idPersonal) => {
  const startDownload = async (url) => {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'blob',
    })
    const href = URL.createObjectURL(response);
    const link = document.createElement('a');
    link.href = href;
    link.setAttribute('download', 'archivo.xlsx');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(href);
  }
  return startDownload('/excel/request-vacations?idPersonal=' + idPersonal)
}