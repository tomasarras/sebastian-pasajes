"use client"

import { createUserValidationSchema } from "@/app/validationSchemas/createUserValidationSchema";
import Modal from "./modal"
import { Formik, Form } from 'formik';
import FormikStyledField from "../form/FormikStyledField";
import FormikStyledSelect from "../form/FormikStyledSelect";
import { CLIENT_AGENCY_ID, PROFILES, PROFILES_VALUES } from "@/app/utils/utils";
import FormikStyledRadio from "../form/FormikStyledRadio";
import SecondaryButton from "../buttons/secondaryButton";
import { createUser } from "@/app/services/userService";
import CommonLabel from "../commonLabel";
import useClients from "@/app/hooks/useClients";

export default function ModalCreateUser(props) {
  const clients = useClients()
  
  const documentTypes = [
    { value: "DNI", label: "DNI" },
    { value: "LC", label: "LC" },
  ]

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    if (values.clientId == undefined || values.clientId == 'no-selected') {
      values.client = CLIENT_AGENCY_ID
    }
    values.role = `ROLE_${values.role}`
    values.inactive = values.inactive == 'true'
    delete values.passwordConfirmation
    await createUser(values)
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return <Modal title="Crear Usuario" {...props}>
    <Formik
      validateOnChange={false}
      validateOnBlur={false}
      initialValues={{
        firstName: "",
        lastName: "",
        documentType: "DNI",
        document: "",
        email: "",
        phones: "",
        clientId: "no-selected",
        role: PROFILES_VALUES.UNASSIGNED,
        username: "",
        password: "",
        passwordConfirmation: "",
        inactive: "",
      }}
      validationSchema={createUserValidationSchema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting }) => (
        <Form className="mt-4 min-w-96">
          <FormikStyledField className="mb-4" name="firstName" label="Nombre" />
          <FormikStyledField className="mb-4" name="lastName" label="Apellido" />

          <div className="mb-4">
            <CommonLabel htmlFor="document">Documento</CommonLabel>
            <div className="flex w-full mt-2">
              <FormikStyledSelect className="w-3/12" options={documentTypes} name="documentType" disableLabel />
              <FormikStyledField className=" w-9/12 ml-4" name="document" label="Documento" type="number" disableLabel />
            </div>
          </div>

          <FormikStyledField  className="mb-4" name="email" label="Email" type="email" />
          <FormikStyledField  className="mb-4" name="phones" label="Teléfonos" />
          <FormikStyledSelect
            className="mb-4"
            name="clientId"
            label="Cliente"
            options={clients}
            placeholder="Seleccionar"
            getOptionLabel={(client) => client.businessName}
          />
          <FormikStyledSelect className="mb-4" name="role" label="Perfil" options={PROFILES} />
          <FormikStyledField  className="mb-4" name="username" label="Usuario" />
          <FormikStyledField  className="mb-4" name="password" label="Clave" type="password" />
          <FormikStyledField  className="mb-4" name="passwordConfirmation" label="Confirmar clave" type="password" />
          <FormikStyledRadio  className="mb-4" name="inactive" label="Inactivo" options={[{ label: "Si", value: "true" }, { label: "No", value: "false" }]} />
          <div className="w-full flex justify-end">
            <SecondaryButton type="submit" actionText="Crear Usuario" disabled={isSubmitting}/>
          </div>
        </Form>
      )}
    </Formik>
  </Modal>
}
