"use client"

import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import SecondaryButton from "../buttons/secondaryButton";
import FormikStyledSelect from "../form/FormikStyledSelect";
import { createLocationValidationSchema } from "@/app/validationSchemas/createLocationValidationSchema";
import useProvinces from "@/app/hooks/useProvinces";
import { useEffect, useState } from "react";

export default function ModalCreateLocation({ location, onSubmit, ...props }) {
  const provinces = useProvinces()
  const isEditMode = location != null
  const [localLocation, setLocalLocation] = useState(null)

  useEffect(() => {
    if (location) {
      const localLocation = JSON.parse(JSON.stringify(location));
      if (localLocation.provinceId == 1) {
        localLocation.provinceId = "no-selected"
      }
      setLocalLocation(localLocation)
    }
  }, [location])
  
  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    
    if (values.provinceId == 'no-selected' || values.provinceId == '') {
      values.provinceId = null
    }
    console.log(values);
    await onSubmit(values)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal title={`${isEditMode ? "Editar" : "Crear"} Localidad`} {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      enableReinitialize
      initialValues={isEditMode ? localLocation : {
        name: "",
        postalCode: "",
        provinceId: "no-selected"
      }}
      validationSchema={createLocationValidationSchema}
      onSubmit={handleOnSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 sm:min-w-96">
          <FormikStyledField className="mb-4" name="name" label="Nombre" />
          <FormikStyledField className="mb-4" name="postalCode" label="Codigo postal" />
          <FormikStyledSelect
            name="provinceId"
            label="Provincia"
            options={provinces}
            placeholder="Seleccionar"
            getOptionLabel={province => province.name}
            getOptionValue={province => province.id}
          />
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton className="w-full" type="submit" actionText={`${isEditMode ? "Editar" : "Crear"} Localidad`} disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
