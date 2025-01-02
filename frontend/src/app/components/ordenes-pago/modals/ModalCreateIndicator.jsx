"use client"
import React, { useState } from "react";
import Modal from "@/app/components/modals/modal"
import { Formik, Form } from 'formik';
import { dateToPickerFormat } from "@/app/utils/utils";
import FormikStyledField from "@/app/components/form/FormikStyledField";
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import { createActivityValidationSchema } from "@/app/validationSchemas/ordenes-pago/createActivityValidationSchema";
import DatePicker from "../../form/input/date/DatePicker";
import CommonLabel from "../../commonLabel";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

export default function ModalCreateIndicator({ action, onSubmit, entityName, ...props }) {
  
  const [returnDate, setReturnDate] = useState(dateToPickerFormat(new Date()))
  
  const isEditMode = action != null
  
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
      initialValues={isEditMode ? action : {
        name: "",
        date: ""
      }}
      validationSchema={createActivityValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96">
          <FormikStyledField className="mb-4" name="date" label="Año" />
          <div className="mb-4">
            <CommonLabel>Fecha</CommonLabel>
              <DatePicker
                name="fechaA"
                value={fechaA}
                onChange={setReturnDate}
                lassName="relative z-100"
                inputPlaceholder="Seleccionar fecha"
              />
          </div>
          <FormikStyledField className="mb-4" name="obs" label="Observaciones" />
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton className="w-full" type="submit" actionText={`${isEditMode ? "Editar" : "Crear"} ${entityName}`} disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
