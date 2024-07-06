"use client"

import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import SecondaryButton from "../buttons/secondaryButton";
import { createGroupValidationSchema } from "@/app/validationSchemas/createGroupValidationSchema";
import { create } from "@/app/services/provinceService";
import { createProvinceValidationSchema } from "@/app/validationSchemas/createProvinceValidationSchema";

export default function ModalCreateProvince(props) {
  
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    await create(values.name)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal title="Crear Provincia" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name: "",
      }}
      validationSchema={createProvinceValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96">
          <FormikStyledField className="mb-4" name="name" label="Nombre" />
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton className="w-full" type="submit" actionText="Crear Provincia" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
