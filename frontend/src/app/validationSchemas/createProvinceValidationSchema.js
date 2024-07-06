import * as yup from "yup"

export const createProvinceValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("El nombre de la provincia es requerido"),
})