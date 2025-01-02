"use client"
import React, { useContext, useEffect, useRef, useState } from 'react';
import Modal from "../modal";
import { Formik, Form } from 'formik';
import FormikStyledField from "../../form/FormikStyledField";
import FormikStyledSelect from "../../form/FormikStyledSelect";
import SecondaryButton from "../../buttons/secondaryButton";
import * as Yup from 'yup';
import DatePicker from "../../form/input/date/DatePicker";
import { datePickerDateToString, formatDate, stringDateToDate, utils } from "@/app/utils/utils";
import CommonLabel from '../../commonLabel';
import { Context } from '@/app/context/OPContext';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import useLocations from '@/app/hooks/ordenes-pagos/useLocations';
import useProvinces from '@/app/hooks/ordenes-pagos/useProvinces';
import useActivities from '@/app/hooks/ordenes-pagos/useActivities';


const validationSchema = Yup.object().shape({
  nombre: Yup.string().required('La razón social es requerida'),
  apellido: Yup.string(),
  tipoIdentificacion: Yup.string().required('El tipo de identificación es requerido'),
  identificacion: Yup.string().required('El número de identificación es requerido'),
  idIva: Yup.string().required('La condición de IVA es requerida'),
  direccion: Yup.string().required('La dirección es requerida'),
  idLocalidad: Yup.string().required('La localidad es requerida'),
  email: Yup.string().email('Email inválido').required('El email es requerido'),
  idActividad: Yup.string().required('La actividad es requerida'),
  obs: Yup.string(),
});

const ModalCreateClient = ({ client, ...props }) => {
  const activities = useActivities();
  const { createClient, updateClient, } = useContext(Context)
  const provinces = useProvinces()
  const locations = useLocations()
  const [fechaAlta, setFechaAlta] = useState(null)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedProvince, setSelectedProvince] = useState(null)
  const setFieldValueRef = useRef(null)

  const findLocationById = id => locations.find(location => location.id == id)
  
  useEffect(() => {
    if (selectedLocation && setFieldValueRef.current) {      
      const setFieldValue = setFieldValueRef.current
      const province = provinces.find(p => p.id === selectedLocation.idPcia)
      setSelectedProvince(province)
      setFieldValue('provincia', province?.nombre || '')
      setFieldValue('cP', selectedLocation.cP || '')
    }
  }, [selectedLocation, provinces])

  useEffect(() => {
    if (!client) return
    const fechaAlta = stringDateToDate(client.fechaAlta)
    setFechaAlta({ year: fechaAlta.getFullYear(), month: fechaAlta.getMonth() + 1, day: fechaAlta.getDate() })
  }, [client])

  const condicionesIva = [
    { value: "1", label: "RESP.MONOTRIBUTO" },
    { value: "2", label: "RESP.INSCRIPTO" },
    { value: "3", label: "EXENTO" },
    { value: "4", label: "CONSUMIDOR FINAL" },
    { value: "5", label: "SUJETO NO CATEGORIZADO" },
  ];

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      
      values.fechaAlta = datePickerDateToString(fechaAlta)
      values.idActividad = activities.find(activity => activity.id == values.idActividad).id
      values.idLocalidad = findLocationById(values.idLocalidad).id
      if (!client) {
        createClient(values)
      } else {
        updateClient(client.id,values)
      }
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar el cliente:', error);
      setSubmitting(false);
    }
  };

  return (
    <Modal dialogClassName="w-full max-w-screen-lg mx-8" title={client ? "Guardar cambios" : "Crear Cliente"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          nombre: client?.nombre || '',
          apellido: client?.apellido || '',
          tipoIdentificacion: 'CUIL',
          identificacion: client?.identificacion || '',
          idIva: client?.idIva || '',
          direccion: client?.direccion || '',
          idLocalidad: client?.idLocalidad || '',
          cP: client?.cP || '',
          email: client?.email || '',
          fechaAlta: client?.fechaAlta || '',
          idActividad: client?.idActividad || '',
          obs: client?.obs || '',
          provincia: client?.provincia || '',
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, setFieldValue, values }) => {
          setFieldValueRef.current = setFieldValue
          return (
          <Form className="mt-4 min-w-96">

            <FormikStyledField
              className="mb-4"
              name="nombre"
              label="Razón Social"
              />

            <FormikStyledField
              className="mb-4"
              name="apellido"
              label="Nombre Fantasía"
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

            <FormikStyledSelect
              className="mb-4"
              name="idIva"
              label="Condición IVA"
              placeholder="Seleccionar"
              options={condicionesIva}
            />

            <FormikStyledField
              className="mb-4"
              name="direccion"
              label="Dirección"
            />

            <FormikStyledSelect
              className="mb-4"
              name="idLocalidad"
              label="Localidad"
              options={locations}
              placeholder="Seleccionar"
              getOptionLabel={(location) => location.nombre}
              onChange={e => {
                const location = locations.find(loc => loc.id == e);
                
                setSelectedLocation(location);
                setFieldValue('idLocalidad', location?.id || '');
                setFieldValue('provincia', provinces.find(p => p.id === location?.idPcia)?.nombre || '');
                setFieldValue('cP', location?.cP || '');
              }}
              getOptionValue={location => location?.id}
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormikStyledField
                name="provincia"
                label="Provincia"
                disabled
                value={values.provincia}
              />
              <FormikStyledField
                name="cP"
                label="Código Postal"
                disabled
                value={values.cP}
              />
            </div>

            <FormikStyledField
              className="mb-4"
              name="email"
              label="Email"
              type="email"
            />

            <div className="mb-4">
              <CommonLabel>Fecha Alta</CommonLabel>
              <DatePicker
                value={fechaAlta}
                onChange={setFechaAlta}
                inputPlaceholder="Seleccionar fecha"
              />
            </div>

            <FormikStyledSelect
              className="mb-4"
              name="idActividad"
              label="Actividad"
              options={activities}
              placeholder="Seleccionar actividad"
              getOptionLabel={(activity) => activity.nombre}
              getOptionValue={(activity) => activity?.id}
            />

            <FormikStyledField
              className="mb-4"
              name="obs"
              label="Observaciones"
              component="textarea"
              rows={3}
            />

            <div className="w-full flex justify-end">
              <SecondaryButton
                type="submit"
                actionText={client ? "Guardar cambios" : "Crear Cliente"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )
        }}
      </Formik>
    </Modal>
  );
};

export default ModalCreateClient;