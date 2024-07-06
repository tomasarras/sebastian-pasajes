import * as yup from "yup"

export const updateCompanyValidationSchema = yup.object().shape({
  businessName: yup
    .string()
    .required("Razón Social requerida"),
  cuit: yup
    .string()
    .required("El CUIT es requerido"),
  email: yup
    .string()
    .required("Datos Bienvenida requeridos"),
  emailNotification: yup
    .string()
    .email("El email no es valido"),
})