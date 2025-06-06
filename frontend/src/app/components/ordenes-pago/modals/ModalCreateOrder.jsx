"use client"

import React, { useContext, useEffect, useState } from 'react';
import Modal from "@/app/components/modals/modal"
import { Formik, Form } from 'formik';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import FormikStyledField from "@/app/components/form/FormikStyledField";
import FormikStyledSelect from "@/app/components/form/FormikStyledSelect";
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import * as Yup from 'yup';
import DatePicker from "../../form/input/date/DatePicker";
import { datePickerDateToString, getTodayDatePicker, stringDateToDate } from "@/app/utils/utils";
import CommonLabel from '../../commonLabel';
import useProviders from "@/app/hooks/ordenes-pagos/useProviders";
import usePersonals from "@/app/hooks/ordenes-pagos/usePersonals";
import { Context } from '@/app/context/OPContext';
import FileUploadSection from '../FileUploadSection';
import * as ordersService from '../../../services/ordenes-pagos/ordersService'
import OrderFilesTable from '../OrderFilesTable';
import GenericModalDelete from '../../modals/GenericModalDelete';
import useModal from '@/app/hooks/useModal';
import useAuth from '@/app/hooks/ordenes-pagos/useAuth';
import { USER_ROLE } from '@/app/utils/constants';
import ModalNotifyOrder from '../../modals/ordenes-pagos/ModalNotifyOrder';

const validationSchema = Yup.object().shape({
  idOperador: Yup.string().required('El operador es requerido'),
  nFA: Yup.string().required('El N° File Aptour es requerido'),
  nFO: Yup.string().required('El N° File Operador es requerido'),
  importe: Yup.number().required('El importe es requerido'),
  moneda: Yup.string().required('La moneda es requerida'),
  idPersonal: Yup.string().required('El vendedor es requerido'),
  idEstado: Yup.string().required('El estado es requerido'),
  cliente: Yup.string().required('El pasajero es requerido'),
});

export default function ModalCreateOrder({ order, updateOrders, ...props }) {
  const { createOrder, updateOrder, changeAlertStatusAndMessage } = useContext(Context)
  const deleteModalProps = useModal()
  const notifyModal = useModal()
  const userData = useAuth()
  const isAdmin = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER].includes(userData?.role)
  const providers = useProviders();
  const personals = usePersonals();
  const [fechaAlta, setFechaAlta] = useState(getTodayDatePicker());
  const [fechaPago, setFechaPago] = useState(null);
  const [selectedFileId, setSelectedFileId] = useState(null);
  const [showFileUpload, setShowFileUpload] = useState(false);

  useEffect(() => {
    if (!order) return;
    console.log(order.moneda);
    
    if (order.fecha) {
      if (order.fecha == '0000-00-00') {
        setFechaAlta(null)
      } else {
        const fecha = stringDateToDate(order.fecha);
        setFechaAlta({ year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() });
      }
    }
    if (order.fechaP) {
      if (order.fechaP == '0000-00-00') {
        setFechaPago(null);
      } else {
        const fecha = stringDateToDate(order.fechaP);
        setFechaPago({ year: fecha.getFullYear(), month: fecha.getMonth() + 1, day: fecha.getDate() });
      }
    }
  }, [order]);

  const monedas = [
    { value: "0", label: "Pesos" },
    { value: "1", label: "Dólares" },
  ];

  const estados = [
    { value: "2", label: "Pagado" },
    { value: "1", label: "Pendiente" },
  ];

  const handleOnSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      values.fecha = datePickerDateToString(fechaAlta);
      values.fechaP = datePickerDateToString(fechaPago);
      if (values.fechaP == '')
        delete values.fechaP
      if (values.fecha == '')
        delete values.fecha
      if (!order) {        
        await createOrder(values)
      } else {
        await updateOrder(order.id, values)
      }
      updateOrders()
      setSubmitting(false);
      resetForm();
      props.close();
    } catch (error) {
      console.error('Error al guardar la orden:', error);
      setSubmitting(false);
    }
  };

  const handleFileUpload = async (formData) => {
    try {
      await ordersService.uploadFile(order.id, formData);
      setTimeout(() => {
        updateOrders()
        setShowFileUpload(false)
        changeAlertStatusAndMessage(true, 'success', 'Archivo subido exitosamente!');
      }, 300);
    } catch (error) {
      console.error('Error al subir el archivo:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al subir el archivo');
    }
  };

  const handleDeleteFile = async (fileId) => {
    deleteModalProps.open()
    setSelectedFileId(fileId)
  };

  const onDeleteFile = async () => {
    try {
      await ordersService.deleteFile(selectedFileId);
      changeAlertStatusAndMessage(true, 'success', 'Archivo eliminado exitosamente!');
      updateOrders()
    } catch (error) {
      console.error('Error al eliminar el archivo:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al eliminar el archivo');
    }
  }

  const handleDownloadFile = async (file) => {
    try {
      await ordersService.downloadFile(file);
    } catch (error) {
      console.error('Error al descargar el archivo:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al descargar el archivo');
    }
  };

  return (
    <Modal dialogClassName="w-full max-w-screen-lg mx-8" title={order ? "Editar Orden" : "Crear Orden"} {...props}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          idOperador: order?.idOperador || '',
          nFA: order?.nFA || '',
          nFO: order?.nFO || '',
          importe: order?.importe || '',
          moneda: order == undefined ? 'no-selected' : order.moneda,
          idPersonal: order?.idPersonal || '',
          idEstado: order?.idEstado || '',
          cliente: order?.cliente || '',
          des: order?.des || '',
          obs: order?.obs || '',
        }}
        validationSchema={validationSchema}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 min-w-96">
            <FormikStyledSelect
              className="mb-4"
              name="idOperador"
              label="Operador"
              options={providers}
              placeholder="Seleccionar operador"
              getOptionLabel={(provider) => provider.nombre}
              getOptionValue={(provider) => provider.id}
            />

            <div className="mb-4">
              <CommonLabel>Fecha Alta</CommonLabel>
              <DatePicker
                value={fechaAlta}
                onChange={setFechaAlta}
                inputPlaceholder="Seleccionar fecha"
              />
            </div>

            <div className="mb-4">
              <CommonLabel>Fecha Pago</CommonLabel>
              <DatePicker
                value={fechaPago}
                onChange={setFechaPago}
                inputPlaceholder="Seleccionar fecha"
              />
            </div>

            <FormikStyledSelect
              className="mb-4"
              name="idEstado"
              label="Estado"
              options={estados}
              placeholder="Seleccionar estado"
            />

            <FormikStyledField
              className="mb-4"
              name="cliente"
              label="Pasajero"
            />

            <FormikStyledField
              className="mb-4"
              name="nFA"
              label="N° File Aptour"
            />

            <FormikStyledField
              className="mb-4"
              name="nFO"
              label="N° File Operador"
            />

            <div className="grid grid-cols-2 gap-4 mb-4">
              <FormikStyledField
                name="importe"
                label="Importe"
                type="number"
              />
              <FormikStyledSelect
                name="moneda"
                label="Moneda"
                options={monedas}
                placeholder="Seleccionar moneda"
              />
            </div>

            <FormikStyledSelect
              className="mb-4"
              name="idPersonal"
              label="Vendedor"
              options={personals}
              placeholder="Seleccionar vendedor"
              getOptionLabel={(personal) => `${personal.apellido} ${personal.nombre}`}
              getOptionValue={(personal) => personal.id}
            />

            <FormikStyledField
              className="mb-4"
              name="des"
              label="Descripción"
              component="textarea"
              rows={3}
            />

            <FormikStyledField
              className="mb-4"
              name="obs"
              label="Observaciones"
              component="textarea"
              rows={3}
            />

            {order && (
              <>
                {isAdmin && 
                  <div className="mt-4"> {/** Habilita la subida de archivos solo al admin */}
                    <button
                      type="button"
                      onClick={() => setShowFileUpload(!showFileUpload)}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      {showFileUpload ? '- Ocultar' : '+ Agregar archivo'}
                    </button>

                    <FileUploadSection
                      isVisible={showFileUpload}
                      onUpload={handleFileUpload}
                    />
                  </div>
                }
                {order.archivos && order.archivos.length > 0 &&
                  <div className="mt-4 border-t pt-4">
                    <h3 className="text-lg font-medium mb-4">Archivos adjuntos</h3>
                    <OrderFilesTable 
                      files={order.archivos} 
                      onDeleteFile={handleDeleteFile}
                      onDownloadFile={handleDownloadFile}
                    />
                  </div>
                  }
              </>
            )}

            <div className="w-full flex justify-end mt-4">
              {order &&
                <SecondaryButton
                  type="button"
                  className='mr-2'
                  actionText={"Notificar"}
                  onClick={notifyModal.open}
                />
              }
              <SecondaryButton
                type="submit"
                actionText={order ? "Guardar cambios" : "Crear Orden"}
                disabled={isSubmitting}
              />
            </div>
          </Form>
        )}
      </Formik>
      <ModalNotifyOrder order={order} {...notifyModal} />
      <GenericModalDelete type="archivo" onDelete={onDeleteFile} label={selectedFileId} {...deleteModalProps}/>
    </Modal>
  );
}
