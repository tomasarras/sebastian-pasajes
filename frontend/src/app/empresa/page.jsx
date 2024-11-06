"use client"
import React, { useContext } from "react";
import * as companyService from '../services/companyService'
import { Form, Formik } from "formik";
import { updateCompanyValidationSchema } from "../validationSchemas/updateCompanyValidationSchema";
import FormikStyledField from "../components/form/FormikStyledField";
import SecondaryButton from "../components/buttons/secondaryButton";
import { Context } from "../context/Context";
import Container from "../components/Container";
import MainHeader from "../components/MainHeader";

export default function Empresa() {
  const { company } = useContext(Context) 

  const onSubmit = async (values) => {
    const updatedCompany = await companyService.update(values)
    setCompany(updatedCompany)
    setSubmitting(false)
    resetForm()
  }

  return (
    <Container>
      <div className="shadow rounded-lg">
        <MainHeader mainTitle="Empresa" hiddenActionText/>
        <hr />
        <div className="px-2 md:px-4 md:py-4 bg-white">
          {company != null && (
            <Formik
              validateOnChange={false}
              validateOnBlur={false}
              initialValues={company}
              validationSchema={updateCompanyValidationSchema}
              onSubmit={onSubmit}
            >
              {({ isSubmitting }) => (
                <Form className="mt-4 grid grid-cols-1 gap-4 max-w-md">
                  <FormikStyledField name="businessName" label="Razón Social" />
                  <FormikStyledField name="cuit" label="CUIT" />
                  <FormikStyledField name="email" label="Datos Bienvenida" />
                  <FormikStyledField name="emailNotification" label="EMail Ordenes(Para)" />
                  <SecondaryButton disabled={isSubmitting} actionText={'Editar'} type="submit" />
                </Form>
              )}
            </Formik>)}
        </div>
      </div>
    </Container>
  )
}
