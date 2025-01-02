"use client"
import React, { useContext } from "react";
import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import SecondaryButton from "../buttons/secondaryButton";
import { createGroupValidationSchema } from "@/app/validationSchemas/createGroupValidationSchema";
import { Group } from "@mui/icons-material";
import { Context } from "../../context/Context";

export default function ModalEditGroup({group, cleanSelectedGroup, ...props}) {
  const { changeAlertStatusAndMessage, fetchGroups, editGroup } = useContext(Context);
  
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    await editGroup(group.id, values.name);
    changeAlertStatusAndMessage(true, 'success', 'Grupo editado exitosamente!');
    await fetchGroups();
    cleanSelectedGroup();
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
            <SecondaryButton className="w-full" type="submit" actionText="Guardar cambios" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
