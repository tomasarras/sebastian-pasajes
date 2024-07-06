"use client"

import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import SecondaryButton from "../buttons/secondaryButton";
import { createGroupValidationSchema } from "@/app/validationSchemas/createGroupValidationSchema";
import { create } from "@/app/services/groupService";

export default function ModalCreateGroup(props) {
  
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    await create(values.name)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal  title="Crear Grupo" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name: "",
      }}
      validationSchema={createGroupValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4">
          <FormikStyledField className="mb-4" name="name" label="Nombre" />
          <div className="w-full flex justify-end">
            <SecondaryButton className="w-full" type="submit" actionText="Crear Grupo" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
