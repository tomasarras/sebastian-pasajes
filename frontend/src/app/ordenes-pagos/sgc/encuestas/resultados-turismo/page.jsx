"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import ModalCreateEnTurr from "@/app/components/ordenes-pago/modals/ModalCreateEnTurr";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useIsoCourses from "@/app/hooks/ordenes-pagos/iso/useIsoCourses";
import useIsoEncuestasCor from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasCor";
import useIsoEncuestasIssn from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasIssn";
import useIsoEncuestasTur from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasTur";
import useIsoEncuestasTurr from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasTurr";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { evaluarEncuesta, evaluarEncuestaSAT, formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { removeTurr, newTurr, updateTurr } from "@/app/services/ordenes-pagos/iso/isoEncuestasService";

export default function OrdenesPagoEncuestasResultadosTurismo() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("encuesta resultados turismo")
  const { isoEncuestasTurr, fetchIsoEncuestasTurr } = useIsoEncuestasTurr();

  const handleOnDelete = async () => {
    await removeTurr(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Encuesta de turismo eliminada exitosamente!');
    await fetchIsoEncuestasTurr();
  }

  const formatTipoEncuesta = row => {
    const { tipoE } = row
    return tipoE == 1 ? 'Satisfacción al cliente' : 'Consultas cerradas'
  }

  const createTurr = async (en) => {
    try {
      await newTurr(en)
      changeAlertStatusAndMessage(true, 'success', 'Encuesta de turismo creada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear la encuesta de turismo');
    }
  }

  const editTurr = async (en) => {
    try {
      await updateTurr(en)
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
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha),
      },
      {
        name: 'Registró',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      actionColumn
    ];
    return newColumns;
  }, [isoEncuestasTurr]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Encuestas Resultado Turismo" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoEncuestasTurr}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateEnTurr onSubmit={(enTurr) => createTurr(enTurr)} {...createModalProps} />
    <ModalCreateEnTurr onSubmit={(enTurr) => editTurr(enTurr)} enTurr={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la encuesta de turismo" {...deleteModalProps}/>
  </Container>
  )
}

