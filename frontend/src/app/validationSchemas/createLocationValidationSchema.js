import * as yup from "yup"

export const createLocationValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre de la localidad es requerido"),
})