"use client"
import React, { useContext } from "react";
import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import SecondaryButton from "../buttons/secondaryButton";
import { createGroupValidationSchema } from "@/app/validationSchemas/createGroupValidationSchema";
import { editGroup } from "@/app/services/groupService";
import { editClient } from "@/app/services/clientService";
import { Group } from "@mui/icons-material";
import { Context } from "../../context/Context";

export default function ModalEditClient({ client, cleanSelectedClient, ...props}) {
  const { changeAlertStatusAndMessage, fetchClients } = useContext(Context);
  
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    await editClient(client.id, values);
    changeAlertStatusAndMessage(true, 'success', 'Cliente editado exitosamente!');
    await fetchClients();
    cleanSelectedClient();
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal  title={"Editar Grupo " + group.name} {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name: group.name,
      }}
      validationSchema={createGroupValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4">
          <FormikStyledField className="mb-4" name="name" label="Nombre" />
          <div className="w-full flex justify-end">
            <SecondaryButton className="w-full" type="submit" actionText="Editar Grupo" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
