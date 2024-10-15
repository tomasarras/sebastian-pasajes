"use client"
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import CommonInput from "@/app/components/commonInput";
import FormikStyledField from "@/app/components/form/FormikStyledField";
import FormikStyledRadio from "@/app/components/form/FormikStyledRadio";
import useNews from "@/app/hooks/useNews";
import { Form, Formik } from "formik";
import React, { useState } from "react";
import { newsValidationSchema } from "@/app/validationSchemas/newsValidationSchema";
import Container from "@/app/components/Container";


export default function OrdenesPagoNoticias() {
  const news = useNews()
  const currentNew = news[0]
  if (currentNew)
    currentNew.isUrgent = currentNew.isUrgent ? 'S' : 'N' 
  console.log(currentNew, 's');

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    
    //changeAlertStatusAndMessage(true, 'success', 'Grupo creado exitosamente!');
    
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          enableReinitialize
          initialValues={currentNew}
          validationSchema={newsValidationSchema}
          onSubmit={onSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="mt-4">
              <FormikStyledField className="mb-4" name="title" label="Título" />
              <div className="flex gap-2">
                <FormikStyledField className="mb-4" name="subtitle" label="Subtítulo" />
                <FormikStyledRadio className="mb-4" name="isUrgent" label="Urgente" options={[{ label: "Si", value: "S" }, { label: "No", value: "N" }]} />
              </div>
              <FormikStyledField className="mb-4" name="text" label="Texto"  />
              <div className={`mt-1`}>Las <span className="font-bold">Noticias</span> se mostrarán en la página inicial de la <span className="text-green-500">Intranet</span> en reemplazo del mensaje de bienvenida</div>
              <div>Las que tengan seleccionado <span className="text-green-500">Urgente</span> se mostrarán como una alerta roja</div>
              <div className="w-full flex justify-end mt-2">
                <SecondaryButton type="submit" actionText="Guardar" disabled={isSubmitting}/>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
