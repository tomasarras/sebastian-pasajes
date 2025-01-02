"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import ModalCreateEnTur from "@/app/components/ordenes-pago/modals/ModalCreateEnTur";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useIsoCourses from "@/app/hooks/ordenes-pagos/iso/useIsoCourses";
import useIsoEncuestasCor from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasCor";
import useIsoEncuestasIssn from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasIssn";
import useIsoEncuestasTur from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasTur";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { evaluarEncuesta, evaluarEncuestaSAT, formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { removeTur, newTur, updateTur } from "@/app/services/ordenes-pagos/iso/isoEncuestasService";

export default function OrdenesPagoEncuestasTurismo() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("encuesta turismo")
  const {isoEncuestasTur, fetchIsoEncuestasTur} = useIsoEncuestasTur()

  const handleOnDelete = async () => {
    await removeTur(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Encuesta de turismo eliminada exitosamente!');
    await fetchIsoEncuestasTur();
  }

  const formatTipoEncuesta = row => {
    const { tipoE } = row
    return tipoE == 1 ? 'Satisfacción al cliente' : 'Consultas cerradas'
  }

  const createTur = async (en) => {
    try {
      await newTur(en)
      changeAlertStatusAndMessage(true, 'success', 'Encuesta de turismo creada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear la encuesta de turismo');
    }
  }

  const editTur = async (en) => {
    try {
      await updateTur(en)
      changeAlertStatusAndMessage(true, 'success', 'Encuesta de turismo editada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al editar la encuesta de turismo');
    }
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Número',
        sortable: true,
        searchable: false,
        selector: row => row.id,
      },
      {
        name: 'Cliente',
        sortable: true,
        searchable: false,
        selector: row => row.cliente,
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha),
      },
      {
        name: 'Tipo Encuesta',
        sortable: true,
        searchable: false,
        selector: row => formatTipoEncuesta(row),
      },
      ,
      {
        name: 'Vendedor',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      actionColumn
    ];
    return newColumns;
  }, [isoEncuestasTur]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Encuestas Turismo" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoEncuestasTur}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateEnTur onSubmit={(enTur) => createTur(enTur)} {...createModalProps} />
    <ModalCreateEnTur onSubmit={(enTur) => editTur(enTur)} enTur={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la encuesta de turismo" {...deleteModalProps}/>
  </Container>
  )
}

