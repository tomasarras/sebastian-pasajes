"use client"
import React, { useState } from "react";
import Modal from "@/app/components/modals/modal"
import { Formik, Form } from 'formik';
import { dateToPickerFormat } from "@/app/utils/utils";
import FormikStyledField from "@/app/components/form/FormikStyledField";
import FormikStyledSelect from "../../form/FormikStyledSelect";
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import { createActivityValidationSchema } from "@/app/validationSchemas/ordenes-pago/createActivityValidationSchema";
import DatePicker from "../../form/input/date/DatePicker";
import CommonLabel from "../../commonLabel";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import useUsers from "@/app/hooks/useUsers";
import FormikStyledRadio from "../../form/FormikStyledRadio";

export default function ModalCreateAction({ action, onSubmit, entityName, ...props }) {
  
  const [fechaAlta, setFechaAlta] = useState(dateToPickerFormat(new Date()))
  const [fechaBaja, setFechaBaja] = useState(dateToPickerFormat(new Date()))
  
  const isEditMode = action != null
  const users = useUsers();
  
  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    values.fechaAlta = fechaAlta;
    values.fechaBaja = fechaBaja;
    await onSubmit(values)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  const estados = [
    {id: 1, nombre: 'ABIERTO'},
    {id: 1, nombre: 'CERRADO'}
  ]

  return <Modal title={`${isEditMode ? "Editar" : "Crear"} ${entityName}`} {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={isEditMode ? action : {
        estado: {},
        responsable: {},
        vencida: 'NO'
      }}
      validationSchema={createActivityValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96">
          <div className="mb-4">
            <CommonLabel>Fecha alta</CommonLabel>
              <DatePicker
                name="date"
                value={fechaAlta}
                onChange={setFechaAlta}
                lassName="relative z-100"
                inputPlaceholder="Seleccionar fecha"
              />
          </div>
          <div className="mb-4">
            <CommonLabel>Fecha baja</CommonLabel>
              <DatePicker
                name="date"
                value={fechaBaja}
                onChange={setFechaBaja}
                lassName="relative z-100"
                inputPlaceholder="Seleccionar fecha"
              />
          </div>
          <FormikStyledSelect className="mb-4" name="responsable" label="Responsable" options={users} getOptionLabel={user => user.apellido + ' ' + user.nombre} placeholder="Estado" />
          <FormikStyledSelect className="mb-4" name="estado" label="Estado" options={estados} getOptionLabel={estado => estado.nombre} placeholder="Estado" />
          <FormikStyledRadio className="mb-4" name="vencida" label="Implementación Vencida" options={[{ label: "Si", value: "SI" }, { label: "No", value: "NO" }]} />
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton className="w-full" type="submit" actionText={`${isEditMode ? "Editar" : "Crear"} ${entityName}`} disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
