"use client"
import ExportToExcelButton from "@/app/components/buttons/exportToExcelButton";
import TableActionButton from "@/app/components/buttons/tableActionButton";
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import Table from "@/app/components/table";
import SendIcon from '@mui/icons-material/Send';
import useIsoNcs from "@/app/hooks/ordenes-pagos/iso/useIsoNcs";
import HistoryIcon from '@mui/icons-material/History';
import useCRUDModals from "@/app/hooks/useCRUDModals";
import * as utils from "@/app/utils/utils";
import React, { useContext, useMemo, useState, useEffect } from "react";
import * as excelService from '../../../services/ordenes-pagos/excelService'
import useModal from "@/app/hooks/useModal";
import ModalHistory from "@/app/components/modals/ordenes-pagos/ModalHistory";
import { remove, newAction, update } from "@/app/services/ordenes-pagos/iso/isoNcsService";
import ModalNotify from "@/app/components/modals/ordenes-pagos/ModalNotify";
import { Context } from "@/app/context/OPContext";
import * as isoNcsService from '../../../services/ordenes-pagos/iso/isoNcsService'
import Modal from "@/app/components/modals/modal";
import { Form, Formik } from "formik";
import FormikStyledSelect from "@/app/components/form/FormikStyledSelect";
import PrimaryButton from "@/app/components/buttons/ordenes-pago/primaryButton";
import useFilterModal from "@/app/hooks/ordenes-pagos/useFilterModal";
import { FILTER_MODAL_FIELD_TYPE, ISO_NC_STATUS_IDS } from "@/app/utils/constants";
import usePersonals from "@/app/hooks/ordenes-pagos/usePersonals";

export default function OrdenesPagoAcciones() {
  const { changeAlertStatusAndMessage } = useContext(Context)
  const historyModal = useModal()
  const personals = usePersonals()
  const notifyModal = useModal()
  const [selectedAction, setSelectedAction] = useState(null)
  const [actionToNotify, setActionToNotify] = useState(null)
  const { isoNcs, fetchIsoNcs } = useIsoNcs()
  const filterStatuses = [{
    label: "Abierto",
    value: ISO_NC_STATUS_IDS.OPEN,
  },
  {
    label: "Cerrado",
    value: ISO_NC_STATUS_IDS.CLOSE,
  }]
  
  const filterFields = [{
    label: "Estado",
    name: "IdEstado",
    type: FILTER_MODAL_FIELD_TYPE.SELECT,
    values: filterStatuses,
  },
  {
    label: "Personal",
    name: "IdRDet",
    type: FILTER_MODAL_FIELD_TYPE.SELECT,
    values: personals,
    getOptionLabel: personal => personal.apellido + " " + personal.nombre,
  }]
  
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("accion", {
    withActions: (row) => (<>
        <TableActionButton 
          actionIcon={<ExportToExcelButton />} 
          onClick={() => exportToExcel(row)} 
          tooltipText="Exportar a Excel"
        />
        <TableActionButton 
          actionIcon={<HistoryIcon />} 
          onClick={() => openHistoryModal(row)}
          tooltipText="Ver historial"
        />
        <TableActionButton 
          actionIcon={<SendIcon />} 
          onClick={() => openNotifyModal(row)}
          tooltipText="Notificar participantes"
        />
    </>)
  })

  const openHistoryModal = (row) => {
    setSelectedAction(row);
    historyModal.open();
  }

  const openNotifyModal = (row) => {
    setActionToNotify(row);
    notifyModal.open();
  }

  const exportToExcel = (row) => {
    excelService.exportAccionesMejora(row.id)
  }

  const handleOnSubmitFilter = async (values) => {
    if ("IdRDet" in values) {
      values.IdRDet = personals.find(p => (p.apellido + " " + p.nombre) === values.IdRDet).id
    }    
    await fetchIsoNcs(values)
  }

  const { onOpenFilterModal, filterModal } = useFilterModal({ fields: filterFields, entityName: "acciones", onApplyFilter: handleOnSubmitFilter })

  const handleOnDelete = async () => {    
      await remove(selectedEntity.id);
      changeAlertStatusAndMessage(true, 'success', 'Acción eliminada exitosamente!');
      await fetchIsoNcs();
  }
  
  const createAction = async (action) => {
    try {
      await newAction(action)
      changeAlertStatusAndMessage(true, 'success', 'Acción creada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear la acción');
    }
  }

  const editAction = async (action) => {
    try {
      await update(action)
      changeAlertStatusAndMessage(true, 'success', 'Acción editada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al editar la acción');
    }
  }

  const formatDate = date => {
    if (date == '0000-00-00') return ''
    date = new Date(date)
    return utils.formatDate(date)
  }

  const handleNotify = async () => {
    try {
      await isoNcsService.notifyParticipants(actionToNotify?.id)
      changeAlertStatusAndMessage(true, 'success', 'Notificación enviada exitosamente!');
    } catch (error) {
      console.error('Error al notificar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al enviar la notificación');
    }
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Número',
        sortable: true,
        searchable: false,
        selector: row => row.nroNC,
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha),
      },
      {
        name: 'Tipo',
        sortable: true,
        searchable: false,
        selector: row => row?.tipo?.nombre,
      },
      {
        name: 'Responsable',
        sortable: true,
        searchable: false,
        selector: row => `${row?.det?.apellido} ${row?.det?.nombre}`,
      },
      {
        name: 'Impl. Accion',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaA),
      },
      {
        name: 'Verif. Accion',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaVA),
      },
      {
        name: 'Verif. Efic',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaVEF),
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => row?.estado?.nombre,
      },
      actionColumn
    ];
    return newColumns;
  }, [isoNcs]); 

  useEffect(() => {
    console.log(selectedEntity);
    
  }, [selectedEntity])
  

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Acciones" {...mainHeaderProps} onOpenFilterModal={onOpenFilterModal}/>
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoNcs}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateAction onSubmit={(action) => createAction(action)} {...createModalProps} />
    <ModalCreateAction onSubmit={(action) => editAction(action)} action={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la acción" {...deleteModalProps}/>
    <ModalHistory 
      action={selectedAction}
      {...historyModal}
    />
    <ModalNotify 
      onNotify={handleNotify}
      {...notifyModal}
    />
    {filterModal}
    {/* <Modal {...filterModal}>
      <Formik
        validateOnChange={false}
        validateOnBlur={false}
        initialValues={{
          status: "no-selected",
        }}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="mt-4 sm:min-w-96">
            <FormikStyledSelect className="mb-4" name="status" label="Estado" options={filterStatuses} placeholder="Seleccionar" />
            
            <div className="w-full flex justify-end mt-2">
              <PrimaryButton type="submit" actionText={`Aplicar`} disabled={isSubmitting}/>
            </div>
          </Form>
        )}
      </Formik>
    </Modal> */}
  </Container>
  )
}

