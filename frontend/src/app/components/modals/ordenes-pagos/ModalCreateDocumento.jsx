"use client"
import React from 'react';
import Modal from "../modal";
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import FormikStyledSelect from "../../form/FormikStyledSelect";
import SecondaryButton from "../../buttons/secondaryButton";
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  codigo: Yup.string()
    .required('El código es requerido')
    .min(2, 'El código debe tener al menos 2 caracteres'),
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  tipo: Yup.string()
    .required('El tipo es requerido'),
  version: Yup.string()
    .required('La versión es requerida'),
});

const ModalCreateDocumento = ({ documento, ...props }) => {
  const tiposDocumento = [
    { value: "PROCEDIMIENTO", label: "Procedimiento" },
    { value: "INSTRUCTIVO", label: "Instructivo" },
    { value: "FORMULARIO", label: "Formulario" },
    { value: "MANUAL", label: "Manual" },
  ];

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // TODO: Conectar con el servicio para guardar
      console.log('Valores del formulario:', values);
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar el documento:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal title={documento ? "Editar Documento" : "Crear Documento"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          codigo: documento?.codigo || '',
          nombre: documento?.nombre || '',
          tipo: documento?.tipo || '',
          version: documento?.version || '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 min-w-96">
            <FormikStyledField
              className="mb-4"
              name="codigo"
              label="Código"
              placeholder="Ingrese el código del documento"
            />

            <FormikStyledField
              className="mb-4"
              name="nombre"
              label="Nombre"
              placeholder="Ingrese el nombre del documento"
            />

            <FormikStyledSelect
              className="mb-4"
              name="tipo"
              label="Tipo"
              options={tiposDocumento}
              placeholder="Seleccione el tipo de documento"
            />

            <FormikStyledField
              className="mb-4"
              name="version"
              label="Versión"
              placeholder="Ingrese la versión del documento"
            />

            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={documento ? "Guardar cambios" : "Crear Documento"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreateDocumento; 