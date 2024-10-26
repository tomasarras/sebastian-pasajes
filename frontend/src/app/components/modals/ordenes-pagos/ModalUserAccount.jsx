"use client"

import Modal from "../modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import SecondaryButton from "../../buttons/secondaryButton";
import * as userService from '../../../services/ordenes-pagos/userService'
import useAuth from "@/app/hooks/ordenes-pagos/useAuth";
import { updatePasswordValidationSchema } from "@/app/validationSchemas/updatePasswordValidationSchema";
import PrimaryButton from "../../buttons/ordenes-pago/primaryButton";

export default function ModalUserAccount(props) {

  const userData = useAuth()  

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    await userService.changePassword(values.currentPassword, values.newPassword)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return userData && <Modal title="Mi Cuenta" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        firstName: userData.firstName,
        lastName: userData.lastName,
        currentPassword: '',
        newPassword: '',
        newPasswordConfirmation: '',
      }}
      validationSchema={updatePasswordValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96 grid grid-cols-1 gap-4">
          <FormikStyledField disabled name="firstName" label="Nombre" />
          <FormikStyledField disabled name="lastName" label="Apellido" />
          <FormikStyledField type="password" name="currentPassword" label="Contraseña actual" />
          <FormikStyledField type="password" name="newPassword" label="Nueva contraseña" />
          <FormikStyledField type="password" name="newPasswordConfirmation" label="Confirmar nueva contraseña" />
          
          <div className="w-full mt-4 grid grid-cols-2 gap-4">
            <PrimaryButton onClick={props.close} type='button' outline actionText="Cancelar" disabled={isSubmitting}/>
            <PrimaryButton type="submit" actionText="Guardar cambios" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
