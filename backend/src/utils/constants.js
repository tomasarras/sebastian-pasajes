export const STATUSES_VALUES = {
    NOT_ASSIGNED: 1,
    OPEN: 2,
    AUTHORIZED: 3,
    CLOSED: 4,
    REJECTED: 5,
    CANCELED: 6,
    REJECTED_FROM_OPEN: 7,
}

export const STATUSES = {
    NOT_ASSIGNED: "NOT_ASSIGNED",
    OPEN: "OPEN",
    AUTHORIZED: "AUTHORIZED",
    CLOSED: "CLOSED",
    REJECTED: "REJECTED",
    CANCELED: "CANCELED",
    REJECTED_FROM_OPEN: "REJECTED_FROM_OPEN",
}

export const ROLES = {
    UNASSIGNED: "ROLE_UNASSIGNED",
    APPLICANT: "ROLE_APPLICANT",
    AUTHORIZER: "ROLE_AUTHORIZER",
    AGENT: "ROLE_AGENT",
    ADMIN: "ROLE_ADMIN",
    AUDITOR: "ROLE_AUDITOR",
}

export const ROLES_VALUES = {
    UNASSIGNED: 1,
    APPLICANT: 2,
    AUTHORIZER: 3,
    AGENT: 4,
    ADMIN: 5,
    AUDITOR: 6,
}
export const EMPTY_GROUP = 1
export const EMPTY_PROVINCE = 1
export const EMPTY_LOCATION = 1
export const COMPANY_ID = 1
export const EMPTY_USER = 1
export const EMPTY_AGENCY_ID = 1
export const AGENCY_CLIENT_ID = 2

export const CLIENTS_GROUPS = {
    UNASSIGNED: 1,
    ISSN: 2,
}

export const PASSENGER_TYPES = {
    HOLDER: "holder",
    COMPANION: "companion",
}

export const STATUS_ID_TO_TRANSLATED_NAME = {
    1: 'Sin asignar',
    2: 'Abierta',
    3: 'Autorizada',
    4: 'Cerrada',
    5: 'Rechazada',
    6: 'Cancelada',
    7: 'Rechazada',
}