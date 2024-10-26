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
import useIsoEncuestasTur from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasTur";
import useIsoEncuestasTurr from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasTurr";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { evaluarEncuesta, evaluarEncuestaSAT, formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoEncuestasResultadosTurismo() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("encuesta resultados turismo")
  const encuestasTurr = useIsoEncuestasTurr()

  const handleOnDelete = async () => {
    //TODO
  }


  const formatTipoEncuesta = row => {
    const { tipoE } = row
    return tipoE == 1 ? 'Satisfacción al cliente' : 'Consultas cerradas'
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
  }, [encuestasTurr]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Encuestas Resultado Turismo" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={encuestasTurr}
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

