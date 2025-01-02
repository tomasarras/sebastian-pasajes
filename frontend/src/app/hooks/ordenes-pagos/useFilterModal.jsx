"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect, useState } from "react";
import useModal from "../useModal";
import Modal from "@/app/components/modals/modal";
import { Form, Formik } from "formik";
import FormikStyledSelect from "@/app/components/form/FormikStyledSelect";
import PrimaryButton from "@/app/components/buttons/ordenes-pago/primaryButton";
import { FILTER_MODAL_FIELD_TYPE } from "@/app/utils/constants";
import FormikStyledField from "@/app/components/form/FormikStyledField";

export default function useFilterModal({ fields, entityName, onApplyFilter }) {
  const filterModal = useModal()

  const handleOnSubmit = async (values, { setSubmitting }) => {
    await onApplyFilter(values)
    setSubmitting(false)
    filterModal.close()
  }
  
  const modal = <Modal title={`Filtrar ${entityName}`} {...filterModal}>
  <Formik
    validateOnChange={false}
    validateOnBlur={false}
    initialValues={{
      //status: "no-selected",
    }}
    onSubmit={handleOnSubmit}
  >
    {({ isSubmitting }) => (
      <Form className="mt-4 sm:min-w-96">
        {fields?.map((field, i) => {
          if (field.type == FILTER_MODAL_FIELD_TYPE.SELECT) {
            return <FormikStyledSelect key={i} className="mb-4" {...field} options={field.values} placeholder="Seleccionar" />
          } else if (field.type == FILTER_MODAL_FIELD_TYPE.INPUT) {
            return <FormikStyledField key={i} className="mb-4" {...field} />
          }
          return <></>
        })}
        <div className="w-full flex justify-end mt-2">
          <PrimaryButton type="submit" actionText={`Aplicar`} disabled={isSubmitting}/>
        </div>
      </Form>
    )}
  </Formik>
</Modal>

  return {
    filterModal: modal,
    onOpenFilterModal: filterModal.open,
  }
}
