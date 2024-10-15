"use client"

import Modal from "@/app/components/modals/modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "@/app/components/form/FormikStyledField";
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import { createActivityValidationSchema } from "@/app/validationSchemas/ordenes-pago/createActivityValidationSchema";

export default function ModalCreateCourse({ course, onSubmit, entityName, ...props }) {
  
  const isEditMode = course != null
  
  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    await onSubmit(values)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal title={`${isEditMode ? "Editar" : "Crear"} ${entityName}`} {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={isEditMode ? course : {
        name: "",
      }}
      validationSchema={createActivityValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96">
          <FormikStyledField className="mb-4" name="name" label="Nombre" />
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton className="w-full" type="submit" actionText={`${isEditMode ? "Editar" : "Crear"} ${entityName}`} disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
