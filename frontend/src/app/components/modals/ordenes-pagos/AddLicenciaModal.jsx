import React, { useContext } from 'react';
import Modal from '../modal';
import PrimaryButton from '../../buttons/ordenes-pago/primaryButton';
import { Form, Formik } from 'formik';
import FormikStyledField from '../../form/FormikStyledField';
import * as personalsService from "../../../services/ordenes-pagos/personalsService"
import { Context } from '@/app/context/OPContext';

const AddLicenciaModal = ({ onCreate, idPersonal, ...props }) => {

  const { changeAlertStatusAndMessage } = useContext(Context)

  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    values.idPersonal = idPersonal
    const response = await personalsService.newLicenciaByYear(values)
    onCreate(response)
    changeAlertStatusAndMessage(true, 'success', 'Licencia agregada con exito!');
    setSubmitting(false)
    resetForm()
    props.close()
  }

  return (
    <Modal 
      title="Agregar licencia de vacaciones" 
      {...props}
    >
      <div className="p-4">
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          año: '',
          dias: '',
        }}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => {
          return (
          <Form className="mt-4 min-w-96">

            <FormikStyledField
              className="mb-4"
              name="año"
              label="Año"
              />

            <FormikStyledField
              className="mb-4"
              name="dias"
              label="Dias"
            />
            <div className="flex justify-end gap-4">
              <PrimaryButton
                outline
                actionText="Cancelar"
                onClick={props.close}
                className="bg-gray-500 hover:bg-gray-600 min-w-24"
              />
              <PrimaryButton
                actionText="Agregar"
                disabled={isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 min-w-24"
              />
            </div>
        </Form>
      )
      }}
      </Formik>
      </div>
        
    </Modal>
  );
};

export default AddLicenciaModal; 