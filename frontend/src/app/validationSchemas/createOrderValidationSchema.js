import * as yup from "yup"

export const createOrderValidationSchema = yup.object().shape({
  firstName: yup
    .string()
    .required("Ingrese el nombre del pasajero"),
  lastName: yup
    .string()
    .required("Ingrese el apellido del pasajero"),
  document: yup
    .string()
    .required("Ingrese el documento del pasajero"),
  transportType: yup
    .string()
    .required("Especifique el tipo de transporte"),
  phones: yup
    .string()
    .required("Ingrese el telófono de contacto"),
})