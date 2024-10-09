"use client"

import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import SecondaryButton from "../buttons/secondaryButton";
import { createProvinceValidationSchema } from "@/app/validationSchemas/createProvinceValidationSchema";

export default function ModalCreateProvince({ province, onSubmit, ...props }) {
  const isEditMode = province != null
  
  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    await onSubmit(values)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal title={`${isEditMode ? "Editar" : "Crear"} Provincia`} {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={isEditMode ? province : {
        name: "",
      }}
      validationSchema={createProvinceValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96">
          <FormikStyledField className="mb-4" name="name" label="Nombre" />
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton className="w-full" type="submit" actionText={`${isEditMode ? "Editar" : "Crear"} Provincia`} disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
