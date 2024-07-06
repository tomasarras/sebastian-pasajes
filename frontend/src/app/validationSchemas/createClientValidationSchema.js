import * as yup from "yup"

export const createClientValidationSchema = yup.object().shape({
  businessName: yup
    .string()
    .required("Razón Social requerida"),
  bookCode: yup
    .string()
    .required("Numeración Inicial requerida"),
  action: yup
    .string()
    .required("Por favor indique este campo"),
  immediate: yup
    .string()
    .required("Por favor indique este campo"),
})