"use client"
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import CommonInput from "@/app/components/commonInput";
import FormikStyledField from "@/app/components/form/FormikStyledField";
import FormikStyledRadio from "@/app/components/form/FormikStyledRadio";
import useNews from "@/app/hooks/useNews";
import { Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import { newsValidationSchema } from "@/app/validationSchemas/newsValidationSchema";
import Container from "@/app/components/Container";
import { Context } from "@/app/context/OPContext";


export default function OrdenesPagoNoticias() {
  const { changeAlertStatusAndMessage, updateCurrentNew } = useContext(Context)
  const news = useNews()
  const currentNew = news[0]
  if (currentNew)
    currentNew.urgente = currentNew.urgente ? 'S' : 'N' 

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    values.urgente = values.urgente === 'S'    
    await updateCurrentNew(values)
    changeAlertStatusAndMessage(true, 'success', 'Noticia actualizada exitosamente!');
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
              <FormikStyledField className="mb-4" name="titulo" label="Título" />
              <div className="flex gap-2">
                <FormikStyledField className="mb-4" name="subtitulo" label="Subtítulo" />
                <FormikStyledRadio className="mb-4" name="urgente" label="Urgente" options={[{ label: "Si", value: "S" }, { label: "No", value: "N" }]} />
              </div>
              <FormikStyledField textarea className="mb-4" name="texto" label="Texto"  />
              <div className={`mt-1`}>Las <span className="font-bold">Noticias</span> se mostrarán en la página inicial de la <span className="text-green-500">Intranet</span> en reemplazo del mensaje de bienvenida</div>
              <div>Las que tengan seleccionado <span className="text-green-500">Urgente</span> se mostrarán como una alerta roja</div>
              <div className="w-full flex justify-end mt-2">
                {/**TODO: Borrar noticia */}
                <SecondaryButton type="submit" actionText="Guardar" disabled={isSubmitting}/>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
