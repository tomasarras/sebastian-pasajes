"use client"
import React from 'react';
import Modal from "../modal";
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import SecondaryButton from "../../buttons/secondaryButton";
import * as Yup from 'yup';
import * as staffService from '../../../services/ordenes-pagos/personalsService'

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
});

const ModalCreatePuesto = ({ puesto, onCreate, ...props }) => {
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await staffService.createPuesto(values)
      onCreate(values)
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar el puesto:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal title={puesto ? "Editar Puesto" : "Crear Puesto"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          codigo: puesto?.codigo || '',
          nombre: puesto?.nombre || '',
          descripcion: puesto?.descripcion || '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 min-w-96">

            <FormikStyledField
              className="mb-4"
              name="nombre"
              label="Nombre"
              placeholder="Ingrese el nombre del puesto"
            />

            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={puesto ? "Guardar cambios" : "Crear Puesto"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreatePuesto; 