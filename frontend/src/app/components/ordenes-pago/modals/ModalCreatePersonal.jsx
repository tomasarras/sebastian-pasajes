"use client"

import React, { useContext } from 'react';
import Modal from "@/app/components/modals/modal";
import { Formik, Form } from 'formik';
import FormikStyledField from "@/app/components/form/FormikStyledField";
import FormikStyledSelect from "@/app/components/form/FormikStyledSelect";
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import * as Yup from 'yup';
import CommonLabel from '../../commonLabel';
import usePuestos from '@/app/hooks/ordenes-pagos/usePuestos';
import { Context } from '@/app/context/OPContext';

const validationSchema = Yup.object().shape({
  apellido: Yup.string()
    .required('El apellido es requerido')
    .min(2, 'El apellido debe tener al menos 2 caracteres'),
  nombre: Yup.string()
    .required('El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres'),
  tipoDocumento: Yup.string()
    .required('El tipo de documento es requerido'),
  tipoIdentificacion: Yup.string()
    .required('El tipo de identificación es requerido'),
  identificacion: Yup.string()
    .required('El número de identificación es requerido'),
});

const ModalCreatePersonal = ({ personal, ...props }) => {
  const puestos = usePuestos();
  const { createPersonal, updatePersonal } = useContext(Context)
  
  const tiposDocumento = [
    { value: "DNI", label: "DNI" },
    { value: "CF", label: "CF" },
    { value: "LC", label: "LC" },
    { value: "LE", label: "LE" },
    { value: "PAS", label: "PAS" },
  ];

  const tiposIdentificacion = [
    { value: "CUIT", label: "CUIT" },
    { value: "CUIL", label: "CUIL" },
  ];

  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      if (values.idPuesto == 'no-selected' || values.idPuesto == '')
        values.idPuesto = 0
      if (!personal) {
        await createPersonal(values)
      } else {
        await updatePersonal(personal.id, values)
      }
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar el personal:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal title={personal ? "Editar Personal" : "Crear Personal"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          apellido: personal?.apellido || '',
          nombre: personal?.nombre || '',
          tipoDocumento: personal?.tipoDocumento || '',
          documento: personal?.documento || '',
          tipoIdentificacion: personal?.tipoIdentificacion || '',
          identificacion: personal?.identificacion || '',
          eMail: personal?.eMail || '',
          idPuesto: personal?.idPuesto || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 min-w-96">
            <FormikStyledField
              className="mb-4"
              name="apellido"
              label="Apellido"
              placeholder="Ingrese el apellido"
            />

            <FormikStyledField
              className="mb-4"
              name="nombre"
              label="Nombre"
              placeholder="Ingrese el nombre"
            />

            <div className="mb-4">
              <CommonLabel>Documento</CommonLabel>
              <div className="flex gap-4">
                <FormikStyledSelect
                  className="w-1/3"
                  name="tipoDocumento"
                  options={tiposDocumento}
                  placeholder="Tipo"
                  disableLabel
                />
                <FormikStyledField
                  className="w-2/3"
                  name="documento"
                  placeholder="Número"
                  disableLabel
                />
              </div>
            </div>

            <div className="mb-4">
              <CommonLabel>CUIT/CUIL</CommonLabel>
              <div className="flex gap-4">
                <FormikStyledSelect
                  className="w-1/3"
                  name="tipoIdentificacion"
                  options={tiposIdentificacion}
                  placeholder="Tipo"
                  disableLabel
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
              name="eMail"
              label="Email"
              type="email"
              placeholder="Ingrese el email"
            />

            <FormikStyledSelect
              className="mb-4"
              name="idPuesto"
              label="Puesto"
              options={puestos}
              placeholder="Seleccionar puesto"
              getOptionLabel={(puesto) => puesto.nombre}
              getOptionValue={(puesto) => puesto.id}
            />

            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={personal ? "Guardar cambios" : "Crear Personal"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreatePersonal;
