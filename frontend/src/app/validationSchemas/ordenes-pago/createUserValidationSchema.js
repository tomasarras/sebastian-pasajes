import * as yup from "yup"

export const createUserValidationSchema = yup.object().shape({
  usuario: yup
    .string()
    .required("El nombre de usuario es requerido"),
  idPersonal: yup
    .string()
    .required("El nombre es requerido"),
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
})