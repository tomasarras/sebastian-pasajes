import * as yup from "yup"

export const createActivityValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre de la actividad es requerido"),
})