export const PROFILES = [
  { label: "No asignado", value: "UNASSIGNED", },
  { label: "Solicitante", value: "APPLICANT", },
  { label: "Autorizante", value: "AUTHORIZER", },
  { label: "Agente", value: "AGENT", },
  { label: "Administrador", value: "ADMIN", },
  { label: "Auditor", value: "AUDITOR", },
]

export const PROFILES_VALUES = {
  UNASSIGNED: "UNASSIGNED",
  APPLICANT: "APPLICANT",
  AUTHORIZER: "AUTHORIZER", 
  AGENT: "AGENT",
  ADMIN: "ADMIN",
  AUDITOR: "AUDITOR",
}

export const STATUS_NAME_TO_ID = {
  UNASSIGNED: 1,
  OPEN: 2,
  AUTHORIZED: 3,
  CLOSED: 4,
  REJECTED: 5,
  CANCELLED: 6,
  REJECTED_FROM_OPEN: 7,
}

export const STATUS_ID_TO_NAME = {
  1: 'Sin asignar',
  2: 'Abierta',
  3: 'Autorizada',
  4: 'Cerrada',
  5: 'Rechazada',
  6: 'Cancelada',
  7: 'Rechazada (desde abierta)',
}

export const datePickerDateToString = (date) => {
  if (!date) return ''
  date.month = date.month < 10 ? '0' + date.month : date.month 
  date.day = date.day < 10 ? '0' + date.day : date.day 
  return `${date.year}-${date.month}-${date.day}`
}

export const evaluarEncuesta = (encuesta) => {
  switch (encuesta) {
      case 0:
          return ''
      case 1:
          return 'Excelente';
      case 2:
          return 'Muy Bueno';
      case 3:
          return 'Bueno';
      case 4:
          return 'Regular';
      case 5:
          return 'Malo';
      case 6:
          return 'Otro';
      default:
          return ''
  }
}

export const evaluarEncuestaSAT = (encuesta) => {
  switch (encuesta) {
      case 0:
          return '';
      case 1:
          return 'Muy Satisfecho';
      case 2:
          return 'Satisfecho';
      case 3:
          return 'Neutral';
      case 4:
          return 'Insatisfecho';
      case 5:
          return 'Muy Insatisfecho';
      case 6:
          return 'Otro';
      default:
          return '';
  }
}

export const compareDates = (f1, f2) => {
  if (f1 > f2) return 1;
  if (f1 < f2) return 2;
  return 0;
};

export const formatDate = (date) => {
  if (date === '0000-00-00') return ''
  if (typeof date === 'string') date = new Date(date)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const dayOfWeek = (date) => {
  if (date === '0000-00-00') return ''
  if (typeof date === 'string') {
    const [year, month, day] = date.split('-');
    date = new Date(year, month - 1, day);
  }
  const daysOfWeek = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  return daysOfWeek[date.getDay()];
};

export const formatNextBookCode = (nextBookCode) => {
  if (nextBookCode == 0) return 'N° 000000'
  return `N° ${nextBookCode.toString().padStart(6, '0')}`;
}

export const applyFilterParams = (options) => {
  if (options == undefined) return ""
  let concat = ""
  Object.keys(options).forEach(key => {
    if (options[key] != null && options[key] != '')
      concat += `${key}=${options[key]}&`
  })
  return concat.slice(0, -1);
}

export const CLIENT_AGENCY_ID = 2

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export function getOpToken() {
  return localStorage.getItem('opAccessToken')
}

export function getOpAuthHeader() {
  const token = getOpToken()
  return { headers: { Authorization: `Bearer ${token}` } }
}