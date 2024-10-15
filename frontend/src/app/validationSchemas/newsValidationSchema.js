import * as yup from "yup"

export const newsValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required("Ingrese el título de la noticia"),
  text: yup
    .string()
    .required("Ingrese el texto de la noticia"),
})