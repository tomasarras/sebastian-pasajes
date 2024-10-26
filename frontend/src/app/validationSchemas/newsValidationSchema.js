import * as yup from "yup"

export const newsValidationSchema = yup.object().shape({
  titulo: yup
    .string()
    .required("Ingrese el título de la noticia"),
  texto: yup
    .string()
    .required("Ingrese el texto de la noticia"),
})