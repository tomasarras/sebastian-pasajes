"use client"

import Modal from "./modal"
import SecondaryButton from "../buttons/secondaryButton"
import { Form, Formik } from "formik"
import FormikStyledField from "../form/FormikStyledField"
import FormikStyledSelect from "../form/FormikStyledSelect"
import useLocations from "@/app/hooks/useLocations"
import { useEffect, useState } from "react"
import useGroups from "@/app/hooks/useGroups"
import { removeEmptyOrNullValues } from "@/app/utils/utils"

export default function FilterClientsModal({ onApplyFilter, ...props }) {
  const locations = useLocations()
  const groups = useGroups()
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [selectedLocationObject, setSelectedLocationObject] = useState(null)
  const handleOnSubmit = async (values, { setSubmitting }) => {
    if (values.groupId == 'no-selected') {
      values.groupId = null
    } else {
      const group = groups.find(group => group.name == values.groupId)
      values.groupId = {
        value: group.id,
        renderValue: group.name,
      }
    }
    if (values.locationId == 'no-selected') {
      values.locationId = null
    } else {
      const location = locations.find(location => location.name == values.locationId)
      values.locationId = {
        value: location.id,
        renderValue: location.name,
      }
    }
    removeEmptyOrNullValues(values)
    await onApplyFilter(values)
    setSubmitting(false)
    props.close()
  }

  useEffect(() => {
    const selectedLocationObject = locations.find(location => location.name == selectedLocation)
    setSelectedLocationObject(selectedLocationObject)
  }, [selectedLocation, locations])

  return <Modal title={`Filtrar Clientes`} {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        businessName: "",
        cuit: "",
        address: "",
        locationId: "no-selected",
        province:"",
        groupId: "no-selected",
      }}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96">
          <FormikStyledField className="mb-4" name="businessName" label="Razón Social" />
          <FormikStyledField className="mb-4" name="cuit" label="CUIT" type="number" />
          <FormikStyledField className="mb-4" name="address" label="Dirección" />
          <FormikStyledSelect className="mb-4" name="groupId" label="Grupo" options={groups} getOptionLabel={group => group.name} placeholder="Seleccionar" />
          <div className="mb-4">
            <FormikStyledSelect
              name="locationId"
              label="Localidad"
              options={locations}
              placeholder="Seleccionar"
              getOptionLabel={(location) => location.name}
              onChange={setSelectedLocation}
            />
            <div className={`mt-1 ${!selectedLocationObject?.province && 'invisible'}`}>Provincia de {selectedLocationObject?.province?.name}<span className={`${selectedLocationObject?.postalCode == undefined && 'hidden'}`}>, codigo postal {selectedLocationObject?.postalCode}</span></div>
          </div>
          <div className="w-full flex justify-end mt-2">
            <SecondaryButton type="submit" actionText={`Aplicar`} disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
