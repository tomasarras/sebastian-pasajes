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

export const datePickerDateToString = (date) => {
  if (!date) return ''
  date.month = date.month < 10 ? '0' + date.month : date.month 
  date.day = date.day < 10 ? '0' + date.day : date.day 
  return `${date.year}-${date.month}-${date.day}`
}

export const formatDate = (date) => {
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  });
};

export const CLIENT_AGENCY_ID = 2