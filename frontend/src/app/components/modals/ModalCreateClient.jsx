"use client"

import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import FormikStyledSelect from "../form/FormikStyledSelect";
import FormikStyledRadio from "../form/FormikStyledRadio";
import SecondaryButton from "../buttons/secondaryButton";
import { useState } from "react";
import { useEffect } from "react";
import { createClient } from "@/app/services/clientService";
import { createClientValidationSchema } from "@/app/validationSchemas/createClientValidationSchema";
import useGroups from "@/app/hooks/useGroups";
import useLocations from "@/app/hooks/useLocations";

export default function ModalCreateClient(props) {
  const groups = useGroups()
  const locations = useLocations()
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedLocationObject, setSelectedLocationObject] = useState(null)

  useEffect(() => {
    const selectedLocationObject = locations.find(location => location.name == selectedLocation)
    setSelectedLocationObject(selectedLocationObject)
  }, [selectedLocation, locations])

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

  return <Modal title="Crear Cliente" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        businessName: "",
        bookCode: "0",
        cuit: "",
        address: "",
        locationId: "no-selected",
        province:"",
        phones: "",
        groupId: "no-selected",
        action: '',
        immediate: '',
        mailAuto: '0'
      }}
      validationSchema={createClientValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4">
          <FormikStyledField className="mb-4" name="businessName" label="Razón Social" />
          <FormikStyledField className="mb-4" name="bookCode" label="Numeración Inicial" type="number" />
          <FormikStyledField className="mb-4" name="cuit" label="CUIT" type="number" />
          <FormikStyledField className="mb-4" name="address" label="Dirección" />
          <div className="mb-4">
            <FormikStyledSelect
              name="locationId"
              label="Localidad"
              options={locations}
              placeholder="Seleccionar"
              getOptionLabel={(client) => client.name}
              onChange={setSelectedLocation}
            />
            <div className={`mt-1 ${!selectedLocationObject?.province && 'invisible'}`}>Provincia de {selectedLocationObject?.province?.name}<span className={`${selectedLocationObject?.postalCode == undefined && 'hidden'}`}>, codigo postal {selectedLocationObject?.postalCode}</span></div>
          </div>
          <FormikStyledField  className="mb-4" name="phones" label="Teléfonos" />
          <FormikStyledSelect className="mb-4" name="groupId" label="Grupo" options={groups} getOptionLabel={group => group.name} placeholder="Seleccionar" />
          <FormikStyledRadio className="mb-4" name="action" label="Reserva" options={[{ label: "Si", value: "SR" }, { label: "No", value: "NR" }]} />
          <FormikStyledRadio className="mb-4" name="immediate" label="Inmediato" options={[{ label: "Si", value: "S" }, { label: "No", value: "N" }]} />
          <FormikStyledRadio className="mb-4" name="mailAuto" label="Mail autorizante" options={[{ label: "Si", value: "1" }, { label: "No", value: "0" }]} />
          <div className={`mt-1`}>Si Mail Autorizante esté activo, al dar de Alta una Orden de Titular se enviará un mail a los Autorizantes</div>
          <div className="w-full flex justify-end mt-2">
            <SecondaryButton type="submit" actionText="Crear Cliente" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
