"use client"

import Modal from "../modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import FormikStyledSelect from "../../form/FormikStyledSelect";
import SecondaryButton from "../../buttons/secondaryButton";
import * as userService from '../../../services/ordenes-pagos/userService'
import { createUserValidationSchema } from "@/app/validationSchemas/ordenes-pago/createUserValidationSchema";
import usePersonals from "@/app/hooks/ordenes-pagos/usePersonals";
import { useContext } from "react";
import { Context } from "@/app/context/OPContext";
import { USER_ROLE } from "@/app/utils/constants";

export default function ModalCreateUser(props) {
  const { changeAlertStatusAndMessage, fetchUsers } = useContext(Context)
  const personals = usePersonals();
  
  const profiles = [
    { value: USER_ROLE.ADMIN, label: "Administrador sistema" },
    { value: USER_ROLE.ENCUSTA_SATISFACCION, label: "Encuesta satisfaccion" },
    { value: USER_ROLE.VENDEDOR, label: "Vendedor" },
    { value: USER_ROLE.VENDEDOR_ADMINISTRADOR, label: "Administrador de ventas" },
  ]

  const positions = [
    { value: "PERSONAL", label: "PERSONAL" }
  ]

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      delete values.passwordConfirmation
      await userService.create({
        ...values,
        puesto: "PERSONAL",
        tipo: "PERSONAL",
        idPersonal: personals.find(p => p.id == values.idPersonal).id, 
      });
      fetchUsers()
      changeAlertStatusAndMessage(true, 'success', 'Usuario creado exitosamente!');
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al crear usuario:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear el usuario');
      setSubmitting(false);
    }
  }

  return <Modal title="Crear Usuario" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        puesto: "PERSONAL",
        idPersonal: "",
        perfil: "",
        usuario: "",
        password: "",
        passwordConfirmation: "",
      }}
      validationSchema={createUserValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 min-w-96">
          <FormikStyledSelect 
            className="mb-4" 
            name="puesto" 
            label="Puesto" 
            options={positions}
            disabled={true}
          />

          <FormikStyledSelect 
            className="mb-4" 
            name="idPersonal" 
            label="Nombre" 
            options={personals}
            placeholder="Seleccionar personal"
            getOptionLabel={(personal) => `${personal.apellido} ${personal.nombre}`}
            getOptionValue={(personal) => personal.id}
          />

          <FormikStyledSelect 
            className="mb-4" 
            name="perfil" 
            label="Perfil" 
            options={profiles}
            placeholder="Seleccionar perfil"
          />

          <FormikStyledField 
            className="mb-4" 
            name="usuario" 
            label="Usuario" 
          />

          <FormikStyledField  
            className="mb-4" 
            name="password" 
            label="Clave" 
            type="password" 
          />

          <FormikStyledField  
            className="mb-4" 
            name="passwordConfirmation" 
            label="Confirmar clave" 
            type="password" 
          />

          <div className="w-full flex justify-end">
            <SecondaryButton 
              type="submit" 
              actionText="Crear Usuario" 
              disabled={isSubmitting}
            />
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}