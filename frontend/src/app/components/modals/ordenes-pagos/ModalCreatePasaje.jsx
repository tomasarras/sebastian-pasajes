"use client"
import React, { useContext, useEffect, useState } from 'react';
import Modal from "../modal";
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import FormikStyledSelect from "../../form/FormikStyledSelect";
import SecondaryButton from "../../buttons/secondaryButton";
import * as Yup from 'yup';
import DatePicker from "../../form/input/date/DatePicker";
import { datePickerDateToString, stringDateToDate } from "@/app/utils/utils";
import CommonLabel from '../../commonLabel';
import usePersonals from "@/app/hooks/ordenes-pagos/usePersonals";
import { Context } from '@/app/context/OPContext';

const validationSchema = Yup.object().shape({
  nro: Yup.string()
    .required('El número es requerido'),
  pasajero: Yup.string()
    .required('El pasajero es requerido'),
  w: Yup.string()
    .required('El waiber es requerido'),
  idPersonal: Yup.string()
    .required('El usuario es requerido'),
  imp1: Yup.number()
    .required('El pasaje es requerido')
    .min(0, 'El pasaje debe ser mayor o igual a 0'),
  imp2: Yup.number()
    .required('La penalidad es requerida')
    .min(0, 'La penalidad debe ser mayor o igual a 0'),
});

const ModalCreatePasaje = ({ pasaje, ...props }) => {
  const personals = usePersonals();
  const { createPasaje, updatePasaje } = useContext(Context)
  const [fecha, setFecha] = useState(null);

  useEffect(() => {
    if (!pasaje) return;
    if (pasaje.fecha) {
      const fechaObj = stringDateToDate(pasaje.fecha);
      setFecha({ 
        year: fechaObj.getFullYear(), 
        month: fechaObj.getMonth() + 1, 
        day: fechaObj.getDate() 
      });
    }
  }, [pasaje]);

  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      values.fecha = datePickerDateToString(fecha);
      if (!pasaje) {
        await createPasaje(values)
      } else {
        await updatePasaje(pasaje.id, values)
      }
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar el pasaje:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal title={pasaje ? "Editar Pasaje" : "Crear Pasaje"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          nro: pasaje?.nro || '',
          pasajero: pasaje?.pasajero || '',
          w: pasaje?.w || '',
          idPersonal: pasaje?.idPersonal || '',
          imp1: pasaje?.imp1 || '',
          imp2: pasaje?.imp2 || '',
          obs: pasaje?.obs || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting }) => (
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
              name="nro"
              label="Número de pasaje"
              placeholder="Ingrese el número"
            />

            <FormikStyledField
              className="mb-4"
              name="pasajero"
              label="Pasajero"
              placeholder="Ingrese el pasajero"
            />

            <FormikStyledField
              className="mb-4"
              name="w"
              label="Número Waiber"
              placeholder="Ingrese el número"
            />

            <FormikStyledSelect
              className="mb-4"
              name="idPersonal"
              label="Usuario"
              options={personals}
              placeholder="Seleccionar usuario"
              getOptionLabel={(personal) => `${personal.apellido} ${personal.nombre}`}
              getOptionValue={(personal) => personal.id}
            />

            <FormikStyledField
              className="mb-4"
              name="imp1"
              label="Pasaje"
              placeholder="Ingrese el valor del pasaje"
            />

            <FormikStyledField
              className="mb-4"
              name="imp2"
              label="Penalidad"
              placeholder="Ingrese el valor de la penalidad"
            />

            <FormikStyledField
              className="mb-4"
              textarea
              name="obs"
              label="Observaciones"
              placeholder="Observaciones"
            />


            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={pasaje ? "Guardar cambios" : "Crear Pasaje"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default ModalCreatePasaje; 