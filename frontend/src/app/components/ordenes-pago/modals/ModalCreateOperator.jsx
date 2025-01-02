"use client"

import React, { useContext } from 'react';
import Modal from "@/app/components/modals/modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "@/app/components/form/FormikStyledField";
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import * as Yup from 'yup';
import CommonLabel from '../../commonLabel';
import { Context } from '@/app/context/OPContext';

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(3, 'El nombre debe tener al menos 3 caracteres'),
  apellido: Yup.string()
    .required('La razón social es requerida'),
  identificacion: Yup.string()
    .required('El número de identificación es requerido'),
  cBU: Yup.string()
    .required('El CBU es requerido'),
  eMail: Yup.string()
    .email('Email inválido')
    .required('El email es requerido'),
});

export default function ModalCreateOperator({ operator, ...props }) {
  const isEditMode = operator != null;
  const { createProvider, updateProvider } = useContext(Context)

  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (!operator) {
        await createProvider(values);
      } else {
        await updateProvider(operator.id, values)
      }
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar el operador:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal title={isEditMode ? "Editar Operador" : "Crear Operador"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          nombre: operator?.nombre || '',
          apellido: operator?.apellido || '',
          tipoIdentificacion: 'CUIL',
          identificacion: operator?.identificacion || '',
          cBU: operator?.cBU || '',
          eMail: operator?.eMail || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 min-w-96">
            <FormikStyledField
              className="mb-4"
              name="nombre"
              label="Nombre"
              placeholder="Ingrese el nombre"
            />

            <FormikStyledField
              className="mb-4"
              name="apellido"
              label="Razón Social"
              placeholder="Ingrese la razón social"
            />

            <div className="mb-4">
              <CommonLabel>Identificación</CommonLabel>
              <div className="flex gap-4">
                <FormikStyledField
                  className="w-1/3"
                  name="tipoIdentificacion"
                  value='CUIL'
                  disableLabel
                  disabled
                />
                <FormikStyledField
                  className="w-2/3"
                  name="identificacion"
                  placeholder="Número"
                  disableLabel
                />
              </div>
            </div>

            <FormikStyledField
              className="mb-4"
              name="cBU"
              label="CBU"
              placeholder="Ingrese el CBU"
            />

            <FormikStyledField
              className="mb-4"
              name="eMail"
              label="Email"
              type="email"
              placeholder="Ingrese el email"
            />

            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={isEditMode ? "Guardar cambios" : "Crear Operador"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
