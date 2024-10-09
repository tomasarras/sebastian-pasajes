"use client"
import React, { useContext } from "react";
import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import FormikStyledSelect from "../form/FormikStyledSelect";
import { CLIENT_AGENCY_ID, PROFILES, PROFILES_VALUES } from "@/app/utils/utils";
import FormikStyledRadio from "../form/FormikStyledRadio";
import SecondaryButton from "../buttons/secondaryButton";
import { updateUser } from "@/app/services/userService";  // Aquí asumo que tienes un servicio para actualizar usuarios
import CommonLabel from "../commonLabel";
import useClients from "@/app/hooks/useClients";
import { Context } from "@/app/context/Context";
import { createUserValidationSchema } from "@/app/validationSchemas/createUserValidationSchema"; // Asumo que la validación es similar

export default function ModalEditUser({ user, cleanSelectedUser, ...props }) {
  const clients = useClients();
  const { fetchUsers, changeAlertStatusAndMessage } = useContext(Context);

  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "LC", label: "LC" },
  ];

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.clientId == undefined || values.clientId == 'no-selected') {
      values.client = CLIENT_AGENCY_ID;
    } else {
      values.clientId = clients.find(client => client.businessName === values.clientId).id;
    }

    values.role = `ROLE_${values.role}`;
    values.inactive = values.inactive === 'true';
    delete values.passwordConfirmation;

    // Llamada a la función de actualizar usuario
    await updateUser(user.id, values);
    changeAlertStatusAndMessage(true, 'success', 'Usuario editado exitosamente!');
    await fetchUsers();
    cleanSelectedUser(); // Limpiar el usuario seleccionado después de editar
    setSubmitting(false);
    resetForm();
    props.close();
  };

  return (
    <Modal title={"Editar Usuario " + user.firstName} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          firstName: user.firstName,
          lastName: user.lastName,
          documentType: user.documentType || "DNI",
          document: user.document,
          email: user.email,
          phones: user.phones,
          clientId: user.clientId || "no-selected",
          role: user.role ? user.role.replace("ROLE_", "") : PROFILES_VALUES.UNASSIGNED,
          username: user.username,
          password: "", // No mostramos la clave actual
          passwordConfirmation: "",
          inactive: user.inactive ? "true" : "false",
        }}
        validationSchema={createUserValidationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 min-w-96">
            <FormikStyledField className="mb-4" name="firstName" label="Nombre" />
            <FormikStyledField className="mb-4" name="lastName" label="Apellido" />

            <div className="mb-4">
              <CommonLabel htmlFor="document">Documento</CommonLabel>
              <div className="flex w-full mt-2">
                <FormikStyledSelect className="w-3/12" options={documentTypes} name="documentType" disableLabel />
                <FormikStyledField className=" w-9/12 ml-4" name="document" label="Documento" type="number" disableLabel />
              </div>
            </div>

            <FormikStyledField className="mb-4" name="email" label="Email" type="email" />
            <FormikStyledField className="mb-4" name="phones" label="Teléfonos" />
            <FormikStyledSelect
              className="mb-4"
              name="clientId"
              label="Cliente"
              options={clients}
              placeholder="Seleccionar"
              getOptionLabel={(client) => client.businessName}
            />
            <FormikStyledSelect className="mb-4" name="role" label="Perfil" options={PROFILES} />
            <FormikStyledField className="mb-4" name="username" label="Usuario" />
            <FormikStyledField className="mb-4" name="password" label="Clave (dejar en blanco si no se va a cambiar)" type="password" />
            <FormikStyledField className="mb-4" name="passwordConfirmation" label="Confirmar clave" type="password" />
            <FormikStyledRadio className="mb-4" name="inactive" label="Inactivo" options={[{ label: "Si", value: "true" }, { label: "No", value: "false" }]} />
            <div className="w-full flex justify-end">
              <SecondaryButton type="submit" actionText="Editar Usuario" disabled={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
