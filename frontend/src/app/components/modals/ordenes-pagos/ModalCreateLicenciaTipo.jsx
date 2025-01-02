"use client"
import React from 'react';
import Modal from "../modal";
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import SecondaryButton from "../../buttons/secondaryButton";
import * as Yup from 'yup';
import * as personalsService from '../../../services/ordenes-pagos/personalsService'

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
});

const ModalCreateLicenciaTipo = ({ licencia, onCreate, ...props }) => {
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      await personalsService.createLicenciaTipo(values);
      onCreate(values)
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar la licencia:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal title={licencia ? "Editar Licencia" : "Crear Licencia"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          nombre: licencia?.nombre || '',
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
              placeholder="Ingrese el nombre de la licencia"
            />

            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={licencia ? "Guardar cambios" : "Crear Licencia"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreateLicenciaTipo; 