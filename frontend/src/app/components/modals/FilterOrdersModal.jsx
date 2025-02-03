"use client"

import Modal from "./modal"
import SecondaryButton from "../buttons/secondaryButton"
import { Form, Formik } from "formik"
import FormikStyledField from "../form/FormikStyledField"
import FormikStyledSelect from "../form/FormikStyledSelect"
import { useEffect, useState } from "react"
import Checkbox from "../form/Checkbox"
import { datePickerDateToString, dateToYYYYMMDD, isAgency, ORDER_STATUS_NAME, removeEmptyOrNullValues, STATUS_COLORS, STATUS_ID_TO_NAME, STATUS_NAME_TO_ID } from "@/app/utils/utils"
import DatePicker from "../form/input/date/DatePicker";
import { utils } from "@hassanmojab/react-modern-calendar-datepicker"
import useClients from "@/app/hooks/useClients"
import useAuth from "@/app/hooks/useAuth"
import Input from "../form/input/input"
 
const statusPlaceholders = [{
    label: 'Abierto',
    value: ORDER_STATUS_NAME.OPEN
  },
  {
    label: 'Cerrado',
    value: ORDER_STATUS_NAME.CLOSED,
  },
  {
    label: 'Rechazado',
    value: ORDER_STATUS_NAME.REJECTED,
  },
  {
    label: 'Autorizado',
    value: ORDER_STATUS_NAME.AUTHORIZED,
  },
  {
    label: 'Anulado',
    value: ORDER_STATUS_NAME.CANCELLED,
  }
]

function ClientFilter({ onChange }) {
  const clients = useClients()
  const handleOnChange = businessName => {
    const client = clients.find(c => c.businessName === businessName)
    onChange(businessName === 'no-selected' ? null : client)
  }
  return (
  <div className={`pt-2 max-w-64`}>
    <h2 className="text-lg font-semibold">Cliente</h2>
    <FormikStyledSelect
      className="mb-4"
      onChange={handleOnChange}
      name="clientId"
      label="Cliente"
      disableLabel
      options={clients}
      placeholder="Cualquiera"
      getOptionLabel={(client) => client.businessName}
    />
  </div>)

}

export default function FilterOrdersModal({ onApplyFilter, ...props }) {
  const authData = useAuth()  
  const [transportType, setTransportType] = useState([])
  const [passengerType, setPassengerType] = useState([])
  const [status, setStatus] = useState([])
  const [registrationDate, setRegistrationDate] = useState(null)
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [client, setClient] = useState(null);
  const [rangeRegistrationDate, setRangeRegistrationDate] = useState({from: null, to: null});

  const addOrRemove = (item, collection, setter) => {
    if (collection.includes(item)) {
      setter(collection.filter(i => i != item))
    } else {
      setter([...collection, item])
    }
  }

  const getYesterdayDate = () => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return dateToYYYYMMDD(yesterday);
  };

  const changeRegistrationDate = (date) => {
    if (registrationDate === date) {
      setRegistrationDate(null);
      if (date === 'other') {
        setShowDatePicker(false);
      }
    } else {
      setRegistrationDate(date);
      if (date === 'other') {
        setShowDatePicker(true);
      } else {
        setShowDatePicker(false);
      }
    }
  }

  const handleDatePickerChange = (date) => {
    setRangeRegistrationDate(date);
  };

  const handleOnSubmit = async (values, { setSubmitting }) => {
    const filters = {
      transportType,
      passengerType,
      status,
      ...values,
      client,
    }
    delete filters.clientId
    if (showDatePicker)
      filters.registrationDate = rangeRegistrationDate
    else
      filters.registrationDate = registrationDate
    removeEmptyOrNullValues(filters)
    if ("client" in filters) {
      filters.client = {
        renderValue: filters.client.businessName,
        value: filters.client
      }
    }
    if ("passengerType" in filters) {
      filters.passengerType = {
        renderValue: filters.passengerType,
        value: filters.passengerType.map(pt => pt === 'Acompañante' ? 'companion' : 'holder'),
      }
    }    
    if ("status" in filters) {
      filters.status = JSON.parse(JSON.stringify(filters.status))
      if (filters.status.includes(ORDER_STATUS_NAME.REJECTED))
        filters.status.push(ORDER_STATUS_NAME.REJECTED_FROM_OPEN)
      filters.status = {
        renderValue: filters.status.filter(st => st !== ORDER_STATUS_NAME.REJECTED_FROM_OPEN).map(st => STATUS_ID_TO_NAME[STATUS_NAME_TO_ID[st]]),
        value: filters.status
      }
    }
    if ("registrationDate" in filters && typeof filters.registrationDate === 'object') {
      const from = datePickerDateToString(filters.registrationDate.from)
      const to = datePickerDateToString(filters.registrationDate.to)
      if (to == '') {
        filters.registrationDate = from
      } else if (from === to) {
        filters.registrationDate = from
      } else {
        filters.registrationDate = {
          renderValue: from + " - " + to,
          value: { from, to }
        }
      }
    }
    setShowDatePicker(false)
    await onApplyFilter(filters)
    setSubmitting(false)
    props.close()
  }

  return <Modal title={`Filtrar Ordenes`} dialogClassName="w-full max-w-screen-lg mx-8" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        firstName:"",
        lastName:"",
        document:"",
        number:"",
      }}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96 w-full text-black">
          <div className="w-full divide-y grid grid-cols-1 gap-4">
            <div className="pt-2 max-w-64">
              <h2 className="text-lg font-semibold">Número de Orden</h2>
              <div className="grid gap-4">
                <FormikStyledField 
                  className="w-full py-2" 
                  disableLabel 
                  name="number" 
                  placeholder="Número" 
                />
              </div>
            </div>

            <div className="">
              <h2 className="text-lg font-semibold">Estado</h2>
              <div className="flex flex-wrap gap-2">
                {statusPlaceholders.map((st) => (
                  <label key={st.label} className="inline-flex items-center">
                    <Checkbox
                      color={STATUS_COLORS[st.value]}
                      label={st.label}
                      onClick={() => addOrRemove(st.value, status, setStatus)}
                      checked={status.includes(st.value)}
                    />
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-lg font-semibold">Transporte</h2>
              <div className="flex gap-2">
                {['Avion', 'Omnibus'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <Checkbox label={type} onClick={() => addOrRemove(type, transportType, setTransportType)} checked={transportType.includes(type)}/>
                  </label>
                ))}
              </div>
            </div>
            
            {isAgency(authData) && 
              <ClientFilter onChange={setClient}/>
            }

            <div className="pt-2">
              <h2 className="text-lg font-semibold">Tipo de pasajero</h2>
              <div className="flex gap-2">
                {['Titular', 'Acompañante'].map((type) => (
                  <label key={type} className="inline-flex items-center">
                    <Checkbox label={type} onClick={() => addOrRemove(type, passengerType, setPassengerType)} checked={passengerType.includes(type)}/>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-lg font-semibold">Pasajero</h2>
              <div className="grid gap-4 md:grid-cols-3">
                <FormikStyledField className="w-full py-2" disableLabel name="firstName" placeholder="Nombre" />
                <FormikStyledField className="w-full py-2" disableLabel name="lastName" placeholder="Apellido" />
                <FormikStyledField className="w-full py-2" disableLabel name="document" placeholder="DNI" />
              </div>
            </div>

            <div className="pt-2">
              <h2 className="text-lg font-semibold">Fecha Estado</h2>
              <div className="flex flex-col gap-2">
                <div className="flex gap-2">
                  <label className="inline-flex items-center">
                    <Checkbox
                      label="Hoy"
                      onClick={() => changeRegistrationDate(dateToYYYYMMDD(new Date()))}
                      checked={registrationDate === dateToYYYYMMDD(new Date())}
                    />
                  </label>
                  <label className="inline-flex items-center">
                    <Checkbox
                      label="Ayer"
                      onClick={() => changeRegistrationDate(getYesterdayDate())}
                      checked={registrationDate === getYesterdayDate()}
                    />
                  </label>
                  <label className="inline-flex items-center">
                    <Checkbox
                      label="Otro"
                      onClick={() => changeRegistrationDate('other')}
                      checked={showDatePicker}
                    />
                  </label>
                </div>
                {showDatePicker && (
                  <div className="mt-2">
                    <DatePicker
                      calendar
                      value={rangeRegistrationDate}
                      onChange={handleDatePickerChange}
                      inputPlaceholder="Seleccionar fecha"
                      maximumDate={utils().getToday()}
                    />
                  </div>
                )}
              </div>
            </div>

          </div>
          <div className="w-full flex justify-end mt-2">
            <SecondaryButton type="submit" actionText={`Aplicar`} disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
