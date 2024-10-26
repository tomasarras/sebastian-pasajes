"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useIsoNcs from "@/app/hooks/ordenes-pagos/iso/useIsoNcs";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import * as utils from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoAcciones() {
  const isoNcs = useIsoNcs()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("accion")

  const handleOnDelete = async () => {
    //TODO
  }

  const formatDate = date => {
    if (date == '0000-00-00') return ''
    date = new Date(date)
    return utils.formatDate(date)
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

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Acciones" {...mainHeaderProps} />
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
    <ModalCreateAction {...createModalProps} />
    <ModalCreateAction action={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}

