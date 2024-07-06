import * as yup from "yup"

export const updatePasswordValidationSchema = yup.object().shape({
  currentPassword: yup
    .string()
    .required("Ingrese su contraseña actual"),
  newPassword: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "La contraseña debe tener al menos 8 caracteres, una letra mayúscula y una letra minúscula"
    ),
  newPasswordConfirmation: yup
    .string()
    .oneOf([yup.ref('newPassword'), null], 'Las contraseñas no coinciden'),
})