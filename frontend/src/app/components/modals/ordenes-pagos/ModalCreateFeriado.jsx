"use client"
import React, { useState } from 'react';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import * as personalsService from '../../../services/ordenes-pagos/personalsService'
import Modal from "../modal";
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import SecondaryButton from "../../buttons/secondaryButton";
import * as Yup from 'yup';
import DatePicker from "../../form/input/date/DatePicker";
import { datePickerDateToString } from "@/app/utils/utils";
import CommonLabel from '../../commonLabel';

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres')
});

const ModalCreateFeriado = ({ feriado, onCreate, ...props }) => {
  const [fecha, setFecha] = useState(null)

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      values.fecha = datePickerDateToString(fecha)
      await personalsService.createFeriado(values)
      onCreate(values)
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar el feriado:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal title={feriado ? "Editar Feriado" : "Crear Feriado"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          fecha: feriado?.fecha || '',
          nombre: feriado?.nombre || '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => (
          <Form className="mt-4 min-w-96">
            <div className="mb-4">
              <CommonLabel>Fecha</CommonLabel>
              <DatePicker
                value={fecha}
                onChange={setFecha}
                inputPlaceholder="Seleccionar fecha"
              />
            </div>

            <FormikStyledField
              className="mb-4"
              name="nombre"
              label="Nombre"
              placeholder="Ingrese el nombre del feriado"
            />

            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={feriado ? "Guardar cambios" : "Crear Feriado"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreateFeriado; 