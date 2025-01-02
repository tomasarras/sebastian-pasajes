"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import ModalCreateEnIssn from "@/app/components/ordenes-pago/modals/ModalCreateEnIssn";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useIsoCourses from "@/app/hooks/ordenes-pagos/iso/useIsoCourses";
import useIsoEncuestasCor from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasCor";
import useIsoEncuestasIssn from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasIssn";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { evaluarEncuesta, evaluarEncuestaSAT, formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { removeIssn, newIssn, updateIssn } from "@/app/services/ordenes-pagos/iso/isoEncuestasService";
import useAuth from "@/app/hooks/ordenes-pagos/useAuth";
import { USER_ROLE } from "@/app/utils/constants";

export default function OrdenesPagoEncuestasISSN() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("encuesta issn")
  const userData = useAuth()
  const hasPermission = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER, USER_ROLE.ENCUSTA_SATISFACCION].includes(userData?.role)
  
  const { isoEncuestasIssn, fetchIsoEncuestasIssn } = useIsoEncuestasIssn()

  const handleOnDelete = async () => {
    await removeIssn(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Encuesta ISSN eliminada exitosamente!');
    await fetchIsoEncuestasIssn();
  }

  const createIssn = async (en) => {
    try {
      await newIssn(en)
      changeAlertStatusAndMessage(true, 'success', 'Encuesta ISSN creada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear la encuesta ISSN');
    }
  }

  const editIssn = async (en) => {
    try {
      await updateIssn(en)
      changeAlertStatusAndMessage(true, 'success', 'Encuesta ISSN editada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al editar la encuesta ISSN');
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
        selector: row => row?.cliente?.nombre,
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha),
      },
      {
        name: 'Satisfacción Servicio',
        sortable: true,
        searchable: false,
        selector: row => evaluarEncuestaSAT(row.sAT),
      },
      actionColumn
    ];
    return newColumns;
  }, [isoEncuestasIssn]); 

  return (
  <Container>
    {hasPermission && <>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Encuestas ISSN" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoEncuestasIssn}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateEnIssn onSubmit={(enIssn) => createIssn(enIssn)} {...createModalProps} />
    <ModalCreateEnIssn onSubmit={(enIssn) => editIssn(enIssn)} enIssn={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la encuesta ISSN" {...deleteModalProps}/>
    </>}
  </Container>
  )
}

