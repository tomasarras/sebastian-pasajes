"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import ModalCreateEnCor from "@/app/components/ordenes-pago/modals/ModalCreateEnCor";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useIsoCourses from "@/app/hooks/ordenes-pagos/iso/useIsoCourses";
import useIsoEncuestasCor from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasCor";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { evaluarEncuesta, formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { removeCor, newCor, updateCor } from "@/app/services/ordenes-pagos/iso/isoEncuestasService";
import useAuth from "@/app/hooks/ordenes-pagos/useAuth";
import { USER_ROLE } from "@/app/utils/constants";

export default function OrdenesPagoEncuestasCoorporativo() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("encuesta coorporativa")
  const {isoEncuestasCor, fetchIsoEncuestasCor} = useIsoEncuestasCor()
  const userData = useAuth()
  const hasPermission = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER, USER_ROLE.ENCUSTA_SATISFACCION].includes(userData?.role)
  

  const handleOnDelete = async () => {
    await removeCor(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Encuesta corporativa eliminada exitosamente!');
    await fetchIsoEncuestasCor();
  }

  const createCor = async (en) => {
    try {
      await newCor(en)
      changeAlertStatusAndMessage(true, 'success', 'Encuesta corporativa creada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear la encuesta corporativa');
    }
  }

  const editCor = async (en) => {
    try {
      await updateCor(en)
      changeAlertStatusAndMessage(true, 'success', 'Encuesta corporativa editada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al editar la encuesta corporativa');
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
        name: 'Tiempo de Respuesta',
        sortable: true,
        searchable: false,
        selector: row => evaluarEncuesta(row.tR),
      },
      {
        name: 'Asesoramiento',
        sortable: true,
        searchable: false,
        selector: row => evaluarEncuesta(row.aSE),
      },
      actionColumn
    ];
    return newColumns;
  }, [isoEncuestasCor]); 

  return (
  <Container>
    {hasPermission && <>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Encuestas Coorporativas" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoEncuestasCor}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateEnCor onSubmit={(enCor) => createCor(enCor)} {...createModalProps} />
    <ModalCreateEnCor onSubmit={(enCor) => editCor(enCor)} enCor={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la encuesta corporativa" {...deleteModalProps}/>
    </>}
  </Container>
  )
}

