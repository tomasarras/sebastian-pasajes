"use client"

import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import SecondaryButton from "../buttons/secondaryButton";
import FormikStyledSelect from "../form/FormikStyledSelect";
import { create } from "@/app/services/locationService";
import { createLocationValidationSchema } from "@/app/validationSchemas/createLocationValidationSchema";
import useProvinces from "@/app/hooks/useProvinces";

export default function ModalCreateLocation(props) {
  const provinces = useProvinces()
  
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.provinceId == 'no-selected') {
      values.provinceId = null
    } else {
      values.provinceId = provinces.find(province => province.name == values.provinceId).id
    }
    await create(values)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal title="Crear Localidad" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        name: "",
        postalCode: "",
        provinceId: "no-selected"
      }}
      validationSchema={createLocationValidationSchema}
      onSubmit={onSubmit}
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
            getOptionLabel={(client) => client.name}
          />
          <div className="w-full flex justify-end mt-4">
            <SecondaryButton className="w-full" type="submit" actionText="Crear Provincia" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
