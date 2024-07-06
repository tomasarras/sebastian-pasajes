"use client"
import CommonInput from "../components/commonInput"
import React, { useEffect, useState } from "react";
import { utils } from "@hassanmojab/react-modern-calendar-datepicker";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SecondaryButton from "../components/buttons/secondaryButton";
import { useRouter } from 'next/navigation'
import { Form, Formik } from "formik";
import Section from "../components/section/section";
import FormikStyledSelect from "../components/form/FormikStyledSelect";
import FormikStyledField from "../components/form/FormikStyledField";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import DatePicker from "../components/form/input/date/DatePicker";
import FormikStyledRadio from "../components/form/FormikStyledRadio";
import useAuth from "../hooks/useAuth";
import useToggle from "../hooks/useToggle";
import { STATUS_NAME_TO_ID } from "../utils/utils";
import Input from "../components/form/input/input";
import OrderColor from "../components/orderColor";
import { formatDateWithSlash } from "../utils/functions";
import CommonLabel from "../components/commonLabel";

const order = {
  "id": 68,
  "clientId": 8,
  "number": 46,
  "registrationDate": "2023-10-09",
  "observations": "na",
  "derivations": 0,
  "statusId": 2,
  "applicantUserId": 16,
  "authorizerUserId": 1,
  "agentUserId": 1,
  "authorizeDate": null,
  "targetDate": null,
  "companies": "",
  "tickets": "",
  "issueDate": null,
  "price": "0.00",
  "passengerType": "holder",
  "firstName": "tomas",
  "lastName": "arras",
  "documentType": "dni",
  "document": "41999064",
  "nationality": "argentina",
  "phones": "2314404477",
  "birthdate": "1999-10-09",
  "transportType": "Avion",
  "departureFrom": "neuquen",
  "departureTo": null,
  "departureDate": "1999-10-09",
  "departureDateHour": "2",
  "returnFrom": null,
  "returnTo": null,
  "returnDate": "1969-12-31",
  "returnDateHour": "2",
  "companionNumber": 0,
  "fatherId": 0,
  "observationAgent": "",
  "fatherNumber": 0,
  "root": 46,
  "client": {
    "id": 8,
    "businessName": "ISSN TURISMO",
    "bookCode": null,
    "cuit": null,
    "address": null,
    "locationId": 2,
    "province": "Neuquen",
    "postalCode": "8300",
    "phones": null,
    "icon": null,
    "nextBookCode": 1,
    "action": "SR",
    "immediate": "S",
    "groupId": 2,
    "mailAuto": 0
  },
  "applicantUser": {
    "firstName": "Macarena",
    "lastName": "Garcia Ruiz"
  },
  "authorizerUser": {
    "firstName": "<No Asignado>",
    "lastName": ""
  }
}

const formatDate = (date) => {
  if (!date || date == '') return ''
  let [year, month, day] = date.split('-')
  year = parseInt(year)
  month = parseInt(month)
  day = parseInt(day)
  return { year, month, day }
}

export default function ModificarOrden() {
  const [birthdate, setBirthdate] = useState(formatDate(order.birthdate));
  const userData = useAuth()
  //const isAdminView = userData?.isAdmin || userData?.isAgent
  const isAdminView = true
  const [issueDate, setIssueDate] = useState(formatDate(order.issueDate));
  const [returnDate, setReturnDate] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [disabledPassengerFields, toggleDisabledPassengerFields] = useToggle()

  const getTranslatedStatus = (statusId) => {
    switch (statusId) {
      case STATUS_NAME_TO_ID.UNASSIGNED: return "No asignado"
      case STATUS_NAME_TO_ID.OPEN: return "Abierta"
      case STATUS_NAME_TO_ID.AUTHORIZED: return "Autorizada"
      case STATUS_NAME_TO_ID.CLOSED: return "Cerrada"
      case STATUS_NAME_TO_ID.REJECTED: return "Rechazada"
      case STATUS_NAME_TO_ID.CANCELLED: return "Anulada"
      case STATUS_NAME_TO_ID.REJECTED_FROM_OPEN: return "Rechazada"
    }
  }

  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "LC", label: "LC" },
  ]

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.groupId == 'no-selected') {
      values.groupId = null
    }
    if (values.locationId == 'no-selected') {
      values.locationId = null
    }
    await createClient(values)
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

  const getStatusDate = () => {
    if (order.statusId == STATUS_NAME_TO_ID.OPEN) {
      return formatDate(order.registrationDate)
    }
    if (order.statusId == STATUS_NAME_TO_ID.AUTHORIZED) {
      return formatDate(order.authorizeDate)
    }
    return formatDate(order.targetDate)
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

  return (
    <div className="sm:m-4 py-4">
      <h2 className="flex items-center"><OrderColor statusId={order.statusId}/><span className="ml-2">Orden N°{order.number}</span></h2>
      <div className="text-sm mt-1 text-gray-500">Creada en {formatDateWithSlash(order.registrationDate)}</div>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          documentType: order.documentType,
          document: order.document,
          firstName: order.firstName,
          lastName: order.lastName,
          nationality: order.nationality,
          phones: order.phones,
          departureFrom: order.departureFrom,
          departureTo: order.departureTo,
          departureDateHour: order.departureDateHour,
          transportType: order.transportType,
          returnFrom: order.returnFrom,
          returnTo: order.returnTo,
          returnDateHour: order.returnDateHour,
          observations: order.observations,
          derivations: order.derivations,
          applicantFirstName: order.applicantUser.firstName,
          applicantLastName: order.applicantUser.lastName,
          authorizerFirstName: order.authorizerUser.firstName,
          authorizerLastName: order.authorizerUser.lastName,
          authorizeDate: order.authorizeDate,
        }}
        //TODO crear schema
        //validationSchema={createClientValidationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting, values, setFieldValue }) => (
          <Form className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Section disabled={isAdminView} title='Datos del pasajero'>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="w-full">
                  <CommonLabel htmlFor="document">Documento</CommonLabel>
                  <div className="flex w-full mt-2">
                    <FormikStyledSelect disabled={isAdminView} className="w-4/12" options={documentTypes} name="documentType" disableLabel />
                    <FormikStyledField disabled={isAdminView} className=" w-8/12 ml-4" name="document" label="Documento" type="number" disableLabel />
                  </div>
                </div>
                <div className="w-full">
                  <label className="md:invisible hidden md:block">.</label>
                  <button
                    onClick={() => completePassenger(values, setFieldValue)}
                    type="button"
                    className="md:mt-2 md:max-w-40 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 flex justify-center items-center
                  disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-900  disabled:cursor-not-allowed"
                    disabled={values.document == '' || isAdminView}
                  >
                    <MagnifyingGlassIcon className="w-4 h-4 mr-2" /> Buscar
                  </button>
                </div>
                <FormikStyledField disabled={isAdminView} name="firstName" label="Nombres" />
                <FormikStyledField disabled={isAdminView} name="lastName" label="Apellido" />
                <FormikStyledField disabled={isAdminView} name="phones" label="Teléfono de contacto" />
                <FormikStyledField disabled={isAdminView} name="nationality" label="Nacionalidad" />
                <div className="w-full">
                  <CommonLabel>Fecha de nacimiento</CommonLabel>
                  <DatePicker
                    disabled={isAdminView}
                    value={birthdate}
                    onChange={setBirthdate}
                    inputPlaceholder="Seleccionar fecha"
                    maximumDate={utils().getToday()}
                  />
                  <div className={`mt-1 text-xs ${!birthdate && "invisible"}`}>Edad {getYears(birthdate)} años</div>
                </div>
              </div>
            </Section>
            <Section disabled={isAdminView} title='Datos del boleto'>
              <FormikStyledRadio disabled={isAdminView} className="mb-4" name="transportType" label="Transporte" options={[{ label: "Avion", value: "Avion" }, { label: "Omnibus", value: "Omnibus" }]} />
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="flex flex-col">
                  <div className="text-center"><h3 className="text-black mb-2">Ida</h3></div>
                  <FormikStyledField disabled={isAdminView} className="mb-4" name="departureFrom" label="Desde" />
                  <FormikStyledField disabled={isAdminView} className="mb-4" name="departureTo" label="Hasta" />
                  <div className="mb-4">
                    <CommonLabel>Fecha</CommonLabel>
                    <DatePicker
                      disabled={isAdminView}
                      value={departureDate}
                      onChange={setDepartureDate}
                      inputPlaceholder="Seleccionar fecha"
                    />
                  </div>
                  <FormikStyledField disabled={isAdminView} name="departureDateHour" label="Hora" />
                </div>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <div className="text-center"><h3 className="text-black mb-2">Regreso</h3></div>
                    <FormikStyledField disabled={isAdminView} className="mb-4" name="returnFrom" label="Desde" />
                    <FormikStyledField disabled={isAdminView} className="mb-4" name="returnTo" label="Hasta" />
                    <div className="mb-4">
                      <CommonLabel>Fecha</CommonLabel>
                      <DatePicker
                        disabled={isAdminView}
                        value={returnDate}
                        onChange={setReturnDate}
                        inputPlaceholder="Seleccionar fecha"
                      />
                    </div>
                    <FormikStyledField disabled={isAdminView} name="returnDateHour" label="Hora" />
                  </div>
                </div>
              </div>

            </Section>
            <Section disabled={isAdminView} title='Observaciones'>
              <FormikStyledField disabled={isAdminView} className="mb-4" name="observations" label="Observaciones" />
            </Section>
            <Section disabled={isAdminView} title='Datos del solicitante'>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormikStyledField disabled className="mb-4" name="applicantFirstName" label="Nombres" />
                <FormikStyledField disabled className="mb-4" name="applicantLastName" label="Apellido" />
                <FormikStyledField disabled={isAdminView} name="derivations" label="Deriv./Exped." />
              </div>
            </Section>
            <Section disabled title='Datos del autorizante'>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <FormikStyledField disabled className="mb-4" name="authorizerFirstName" label="Nombres" />
                <FormikStyledField disabled className="mb-4" name="authorizerLastName" label="Apellido" />
                <div className="w-full">
                  <CommonLabel>Fecha</CommonLabel>
                  <DatePicker value={formatDate(values.authorizeDate)} inputPlaceholder="Sin fecha" readOnly disabled />
                </div>
              </div>
            </Section>
            <Section disabled={!isAdminView} title='Para ser completado por Sebastian & Co'>
              <FormikStyledField disabled={!isAdminView} className="mb-4" name="companies" label="Empresa de transporte" />
              <FormikStyledField disabled={!isAdminView} className="mb-4" name="tickets" label="N° de Boleto/Tkt" />
              <div className="mb-4">
                <CommonLabel>Fecha de emisión</CommonLabel>
                <DatePicker
                  disabled={!isAdminView}
                  value={issueDate}
                  onChange={setIssueDate}
                  inputPlaceholder="Seleccionar fecha"
                />
              </div>
              <FormikStyledField disabled={!isAdminView} className="mb-4" name="price" label="Total OP $" />
            </Section>
            <Section disabled title='Estado de la orden'>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div>
                  <CommonLabel htmlFor="status">Estado</CommonLabel>
                  <Input disabled className="mb-4" name="status" value={getTranslatedStatus(order.statusId)} />
                </div>
                <div className="w-full">
                  <CommonLabel>Fecha</CommonLabel>
                  <DatePicker value={getStatusDate()} inputPlaceholder="Sin fecha" readOnly disabled />
                </div>
              </div>
            </Section>
            <div className="w-full flex justify-end mt-4">
              <SecondaryButton type="submit" actionText="Modificar Orden" disabled={isSubmitting} />
            </div>
          </Form>
        )}
      </Formik>
    </div>)
}
