"use client"

import { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import Modal from "./modal"
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import { Formik, Form } from 'formik';
import DatePicker from "../form/input/date/DatePicker";
import FormikStyledField from "../form/FormikStyledField";
import FormikStyledSelect from "../form/FormikStyledSelect";
import FormikStyledRadio from "../form/FormikStyledRadio";
import SecondaryButton from "../buttons/secondaryButton";
import { useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/solid'
import { getPassengersBy } from "@/app/services/passengerService";
import useToggle from "@/app/hooks/useToggle";
import useAuth from "@/app/hooks/useAuth";
import Section from "../section/section";
import CommonLabel from "../commonLabel";
import { createOrderValidationSchema } from "@/app/validationSchemas/createOrderValidationSchema";
import { datePickerDateToString } from "@/app/utils/utils";
import * as ordersService from '../../services/ordersService'

export default function ModalCreateOrder(props) {
  const [birthdate, setBirthdate] = useState(null);
  const userData = useAuth()
  const [returnDate, setReturnDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [disabledPassengerFields, toggleDisabledPassengerFields] = useToggle()

  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "LC", label: "LC" },
  ]

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    values.birthdate = datePickerDateToString(birthdate);
    values.returnDate = datePickerDateToString(returnDate);
    values.departureDate = datePickerDateToString(departureDate);
    values.passenger = {
      firstName: values.firstName,
      lastName: values.lastName,
      documentType: values.documentType,
      document: values.document,
      nationality: values.nationality,
      phones: values.phones,
      birthdate: values.birthdate,
    }
    delete values.firstName
    delete values.lastName
    delete values.documentType
    delete values.document
    delete values.nationality
    delete values.phones
    delete values.birthdate
    //TODO companion si es acompanante
    values.passengerType = "holder"
    await ordersService.create(values)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  const completePassenger = async (values, setFieldValue) => {
    const { document, documentType } = values
    const [passenger] = await getPassengersBy({ document, documentType })
    if (!passenger) return
    setFieldValue("firstName", passenger.firstName)
    setFieldValue("lastName", passenger.lastName)
    setFieldValue("phones", passenger.phones ?? '')
    setFieldValue("nationality", passenger.nationality ?? '')
    if (passenger.birthdate) {
      let [year, month, day] = passenger.birthdate.split('-')
      if (year && month && day) {
        year = parseInt(year)
        month = parseInt(month)
        day = parseInt(day)
        setBirthdate({ year, month, day })
      }
    }
    if (!disabledPassengerFields) {
      toggleDisabledPassengerFields()
    }
  }

  const getYears = birthDate => {
    if (!birthDate) return 0
    const today = new Date();
    const birthDateObj = new Date(birthDate.year, birthDate.month - 1, birthDate.day);
    let age = today.getFullYear() - birthDateObj.getFullYear();
    const monthDiff = today.getMonth() - birthDateObj.getMonth();
    const dayDiff = today.getDate() - birthDateObj.getDate();
    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
      age--;
    }
    return age;
  }

  return <Modal size="2xl" title="Crear Orden" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        documentType: "DNI",
        document: '',
        firstName: '',
        lastName: '',
        nationality: '',
        phones: '',
        transportType: '',
        departureDateFrom: '',
        departureDateUntil: '',
        departureDateHour: '',
        returnDateFrom: '',
        returnDateUntil: '',
        returnDateHour: '',
        observations: '',
        derivation: '',
        applicantFirstName: userData?.firstName,
        applicantLastName: userData?.lastName,
      }}
      validationSchema={createOrderValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, values, setFieldValue }) => (
        <Form>
          <Section title='Datos del pasajero'>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="w-full">
                <CommonLabel htmlFor="document">Documento</CommonLabel>
                <div className="flex w-full mt-2">
                  <FormikStyledSelect className="w-4/12" options={documentTypes} name="documentType" disableLabel />
                  <FormikStyledField className=" w-8/12 ml-4" name="document" label="Documento" type="number" disableLabel />
                </div>
              </div>
              <div className="w-full">
                <label className="md:invisible hidden md:block">.</label>
                <button
                  onClick={() => completePassenger(values, setFieldValue)}
                  type="button"
                  className="md:mt-2 md:max-w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 flex justify-center items-center
                  disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-900  disabled:cursor-not-allowed"
                  disabled={values.document == ''}
                >
                  <MagnifyingGlassIcon className="w-4 h-4 mr-2" /> Buscar
                </button>
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
          <Section title='Datos del boleto'>
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
            </div>

          </Section>
          <Section title='Observaciones'>
            <FormikStyledField className="mb-4" name="observations" label="Observaciones" />
          </Section>
          <Section title='Datos del solicitante'>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <FormikStyledField disabled className="mb-4" name="applicantFirstName" label="Nombres" />
              <FormikStyledField disabled className="mb-4" name="applicantLastName" label="Apellido" />
              <FormikStyledField name="derivation" label="Deriv./Exped." />
            </div>
          </Section>
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton type="submit" actionText="Crear Orden" disabled={isSubmitting} />
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
