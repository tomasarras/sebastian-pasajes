"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import ModalCreateCourse from "@/app/components/ordenes-pago/modals/ModalCreateCourse";
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

export default function OrdenesPagoEncuestasISSN() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("encuesta issn")
  const encuestasIssn = useIsoEncuestasIssn()

  const handleOnDelete = async () => {
    //TODO
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
  }, [encuestasIssn]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Encuestas ISSN" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={encuestasIssn}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateCourse {...createModalProps} />
    <ModalCreateCourse course={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}

