import * as yup from "yup"
import { PROFILES_VALUES } from "../utils/utils";

export const createUserValidationSchema = yup.object().shape({
  email: yup
    .string()
    .email("El email no es valido"),
  firstName: yup
    .string()
    .required("El nombre es requerido"),
  lastName: yup
    .string()
    .required("El apellido es requerido"),
  clientId: yup
    .string()
    .test(
      'client-admin-check',
      'No puede asignar este perfil a este cliente',
      function (clientId) {
        const { role } = this.parent;
        if (clientId == undefined || clientId == 'no-selected') {
          return role == PROFILES_VALUES.ADMIN || role == PROFILES_VALUES.AGENT || role == PROFILES_VALUES.UNASSIGNED || role == PROFILES_VALUES.AUDITOR;
        }
        return true
      }
    )
    .test(
      'client-profile-check',
      'El perfil seleccionado no puede ser aplicado este cliente',
      function (clientId) {
        const { role } = this.parent;
        if (clientId != undefined && clientId != 'no-selected') {
          return role == PROFILES_VALUES.APPLICANT || role == PROFILES_VALUES.AUTHORIZER || role == PROFILES_VALUES.AUDITOR
        }
        return true
      }
    ),
  username: yup
    .string()
    .required("El nombre de usuario es requerido"),
  password: yup
    .string()
    .min(8, "La clave debe contener al menos 8 caracteres")
    .matches(/\d/, "La clave debe tener al menos un numero")
    .matches(/[a-zA-Z]/, "La clave debe tener al menos una letra")
    .required("La clave es requerida"),
  passwordConfirmation: yup
    .string()
    .required("Las clave debe coincidir")
    .oneOf([yup.ref('password'), null], 'Las claves deben coincidir'),
  inactive: yup
    .string()
    .required("Por favor indique si el usuario esta inactivo")
})