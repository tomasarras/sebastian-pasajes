"use client"

import { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import Modal from "./modal";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Formik, Form } from 'formik';
import DatePicker from "../form/input/date/DatePicker";
import FormikStyledField from "../form/FormikStyledField";
import FormikStyledSelect from "../form/FormikStyledSelect";
import FormikStyledRadio from "../form/FormikStyledRadio";
import SecondaryButton from "../buttons/secondaryButton";
import { useState, useEffect } from "react";
import useToggle from "@/app/hooks/useToggle";
import useAuth from "@/app/hooks/useAuth";
import Section from "../section/section";
import CommonLabel from "../commonLabel";
import { createOrderValidationSchema } from "@/app/validationSchemas/createOrderValidationSchema";
import { datePickerDateToString } from "@/app/utils/utils";
import * as ordersService from '../../services/ordersService';

export default function ModalEditOrder({ order, cleanSelectedOrder, ...props }) {
  const [birthdate, setBirthdate] = useState(null);
  const userData = useAuth();
  const [returnDate, setReturnDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [disabledPassengerFields, toggleDisabledPassengerFields] = useToggle();

  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "LC", label: "LC" },
  ];

  const convertToDatePickerFormat = (dateString) => {
    if (!dateString) return null;

    let dateObj = new Date(dateString);
    if (isNaN(dateObj)) return null;

    return {
      year: dateObj.getFullYear(),
      month: dateObj.getMonth() + 1,
      day: dateObj.getDate(),
    };
  };

  useEffect(() => {
    if (order) {
      setBirthdate(convertToDatePickerFormat(order.passenger?.birthdate));
      setDepartureDate(convertToDatePickerFormat(order.departureDate));
      setReturnDate(convertToDatePickerFormat(order.returnDate));
    }
  }, [order]);

  const onSubmit = async (values, { setSubmitting }) => {
    values.birthdate = datePickerDateToString(birthdate);
    values.returnDate = datePickerDateToString(returnDate);
    values.departureDate = datePickerDateToString(departureDate);
    await ordersService.editOrder(order._id, values);
    setSubmitting(false);
    cleanSelectedOrder();
    props.close();
  };

  const getYears = birthDate => {
    if (!birthDate) return 0;
    const today = new Date();
    const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  };

  if (!order) return null;

  return (
    <Modal size="2xl" title="Editar Orden" {...props}>
      <Formik
        enableReinitialize
        initialValues={{
          documentType: order.passenger?.documentType || "DNI",
          document: order.passenger?.document || '',
          firstName: order.passenger?.firstName || '',
          lastName: order.passenger?.lastName || '',
          nationality: order.passenger?.nationality || '',
          phones: order.passenger?.phones || '',
          transportType: order.transportType || '',
          departureDateFrom: order.departureDateFrom || '',
          departureDateUntil: order.departureDateUntil || '',
          departureDateHour: order.departureDateHour || '',
          returnDateFrom: order.returnDateFrom || '',
          returnDateUntil: order.returnDateUntil || '',
          returnDateHour: order.returnDateHour || '',
          observations: order.observations || '',
          derivation: order.derivation || '',
          applicantFirstName: userData?.firstName || '',
          applicantLastName: userData?.lastName || '',
        }}
        validationSchema={createOrderValidationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form>
            <Section title="Datos del pasajero">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="w-full">
                  <CommonLabel htmlFor="document">Documento</CommonLabel>
                  <div className="flex w-full mt-2">
                    <FormikStyledSelect className="w-4/12" options={documentTypes} name="documentType" disableLabel />
                    <FormikStyledField className=" w-8/12 ml-4" name="document" label="Documento" type="number" disableLabel />
                  </div>
                </div>
                <FormikStyledField disabled={disabledPassengerFields} name="firstName" label="Nombres" />
                <FormikStyledField disabled={disabledPassengerFields} name="lastName" label="Apellido" />
                <FormikStyledField disabled={disabledPassengerFields} name="phones" label="Teléfono de contacto" />
                <FormikStyledField disabled={disabledPassengerFields} name="nationality" label="Nacionalidad" />
                <div className="w-full">
                  <CommonLabel>Fecha de nacimiento</CommonLabel>
                  <DatePicker
                    disabled={disabledPassengerFields}
                    value={birthdate}
                    onChange={setBirthdate}
                    inputPlaceholder="Seleccionar fecha"
                    maximumDate={utils().getToday()}
                  />
                  <div className={`mt-1 text-xs ${!birthdate && "invisible"}`}>Edad {getYears(birthdate)} años</div>
                </div>
              </div>
            </Section>
            <Section title="Datos del boleto">
              <FormikStyledRadio className="mb-4" name="transportType" label="Transporte" options={[{ label: "Avión", value: "Avion" }, { label: "Omnibus", value: "Omnibus" }]} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <div className="text-center"><h3 className="text-black mb-2">Ida</h3></div>
                  <FormikStyledField className="mb-4" name="departureDateFrom" label="Desde" />
                  <FormikStyledField className="mb-4" name="departureDateUntil" label="Hasta" />
                  <div className="mb-4">
                    <CommonLabel>Fecha</CommonLabel>
                    <DatePicker
                      value={departureDate}
                      onChange={setDepartureDate}
                      inputPlaceholder="Seleccionar fecha"
                    />
                  </div>
                  <FormikStyledField name="departureDateHour" label="Hora" />
                </div>
                <div className="flex flex-col">
                  <div className="text-center"><h3 className="text-black mb-2">Regreso</h3></div>
                  <FormikStyledField className="mb-4" name="returnDateFrom" label="Desde" />
                  <FormikStyledField className="mb-4" name="returnDateUntil" label="Hasta" />
                  <div className="mb-4">
                    <CommonLabel>Fecha</CommonLabel>
                    <DatePicker
                      value={returnDate}
                      onChange={setReturnDate}
                      inputPlaceholder="Seleccionar fecha"
                    />
                  </div>
                  <FormikStyledField name="returnDateHour" label="Hora" />
                </div>
              </div>
            </Section>
            <Section title="Observaciones">
              <FormikStyledField className="mb-4" name="observations" label="Observaciones" />
            </Section>
            <Section title="Datos del solicitante">
              <FormikStyledField disabled className="mb-4" name="applicantFirstName" label="Nombres" />
              <FormikStyledField disabled className="mb-4" name="applicantLastName" label="Apellido" />
              <FormikStyledField name="derivation" label="Deriv./Exped." />
            </Section>
            <div className="w-full flex justify-end mt-4">
              <SecondaryButton type="submit" actionText="Actualizar Orden" disabled={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
