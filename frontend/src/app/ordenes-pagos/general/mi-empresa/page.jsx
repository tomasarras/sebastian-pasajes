"use client"
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import CommonInput from "@/app/components/commonInput";
import CommonLabel from "@/app/components/commonLabel";
import * as Yup from 'yup';
import Container from "@/app/components/Container";
import FormikStyledField from "@/app/components/form/FormikStyledField";
import FormikStyledSelect from "@/app/components/form/FormikStyledSelect";
import { Context } from "@/app/context/OPContext";
import useParameters from "@/app/hooks/ordenes-pagos/useParameters";
import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import useLocations from "@/app/hooks/ordenes-pagos/useLocations";
import useProvinces from "@/app/hooks/ordenes-pagos/useProvinces";
import Input from "@/app/components/form/input/input";

const validationSchema = Yup.object().shape({
  razonSocial: Yup.string().required('Razón social requerida'),
  nombreFantasia: Yup.string().required('Nombre fantasia es requerido'),
  cUIT: Yup.string().required('El CUIT es requerido'),
  direccion: Yup.string().required('La direccion es requerida'),
  idLocalidad: Yup.string().required('Por favor indique la localidad'),
  telefono: Yup.string().required('El telefono es requerido'),
  eMail: Yup.string().required('El email de Administrador es requerido'),
  eMail2: Yup.string().required('El email de licencias es requerido'),
  pagina: Yup.string().required('La pagina es requerida'),
});

export default function OrdenesPagoMiEmpresa() {
  const { updateParameters, changeAlertStatusAndMessage } = useContext(Context)
  const parameters = useParameters()
  const locations = useLocations()
  const provinces = useProvinces()
  const [selectedProvince, setSelectedProvince] = useState(null)
  const [selectedLocalidad, setSelectedLocalidad] = useState(null)

  useEffect(() => {
    if (!parameters || provinces.length == 0 || locations.length == 0) return
    const location = locations.find(loc => loc.id == parameters.idLocalidad);
    setSelectedProvince(provinces.find(p => p.id === location?.idPcia) || null);
    setSelectedLocalidad(location);
  }, [parameters, provinces, locations])

  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      updateParameters(values)
      setSubmitting(false);
      resetForm();
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      setSubmitting(false);
      changeAlertStatusAndMessage(true, 'error', 'Error al actualizar datos de la empresa')
    }
  }
  

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <h3 className="font-medium">Mi Empresa</h3>
        <Formik
          validateOnChange={false}
          validateOnBlur={false}
          initialValues={parameters}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={handleOnSubmit}
        >
          {({ isSubmitting, setFieldValue }) => (
            <Form className="mt-4">
              <div className="sm:flex sm:gap-4">
                <div className="flex-1">
                  <FormikStyledField
                    className="mb-4"
                    name="razonSocial"
                    label="Razón Social"
                  />

                  <FormikStyledField
                    className="mb-4"
                    name="nombreFantasia"
                    label="Nombre fantasia"
                  />

                  <FormikStyledField
                    className="mb-4"
                    name="cUIT"
                    label="CUIT"
                  />

                  <FormikStyledSelect
                    className="mb-4"
                    name="idLocalidad"
                    label="Localidad"
                    options={locations}
                    placeholder="Seleccionar"
                    getOptionLabel={(location) => location.nombre}
                    onChange={e => {
                      const location = locations.find(loc => loc.id == e);
                      setSelectedProvince(provinces.find(p => p.id === location?.idPcia) || null);
                      setSelectedLocalidad(location);
                      setFieldValue('idLocalidad', location?.id || '');
                    }}
                    getOptionValue={location => location?.id}
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <div className="mb-4">
                      <CommonLabel htmlFor="provincia">Provincia</CommonLabel>
                      <Input disabled id="provincia" value={selectedProvince?.nombre} />
                    </div>

                    <div className="mb-4">
                      <CommonLabel htmlFor="provincia">CP</CommonLabel>
                      <Input disabled id="provincia" value={selectedLocalidad?.cP} />
                    </div>
                  </div>
                </div>
                <div className="flex-1">
                  <FormikStyledField
                    className="mb-4"
                    name="direccion"
                    label="Dirección"
                  />

                  <FormikStyledField
                    className="mb-4"
                    name="telefono"
                    label="Teléfono"
                  />

                  <FormikStyledField
                    className="mb-4"
                    name="eMail"
                    label="Email Administrador"
                  />

                  <FormikStyledField
                    className="mb-4"
                    name="eMail2"
                    label="Email Licencias"
                  />

                  <FormikStyledField
                    className="mb-4"
                    name="pagina"
                    label="Pagina"
                  />
                </div>
              </div>


              <div className="w-full flex justify-end mt-4">
                <SecondaryButton
                  type="submit"
                  actionText="Guardar cambios"
                  disabled={isSubmitting}
                />
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </Container>
  )
}
