import * as yup from "yup"

export const createGroupValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre del grupo es requerido"),
})