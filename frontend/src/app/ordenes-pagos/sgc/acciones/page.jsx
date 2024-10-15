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
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoAcciones() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("accion")
  const actions = [{
    id: '00017',
    fecha: "17-07-2018",
    tipo: 'No Conformidad Real',
    responsable: 'Sebastian Leonardo',
    implAccion: '13-09-2018',
    verifAccion: '12-10-2018',
    verifEfic: '',
    estado: 'Abierto',
  }]

  const handleOnDelete = async () => {
    //TODO
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Numero',
        sortable: true,
        searchable: false,
        selector: row => row.id,
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => row.fecha,
      },
      {
        name: 'Tipo',
        sortable: true,
        searchable: false,
        selector: row => row.tipo,
      },
      {
        name: 'Responsable',
        sortable: true,
        searchable: false,
        selector: row => row.responsable,
      },
      {
        name: 'Impl. Accion',
        sortable: true,
        searchable: false,
        selector: row => row.implAccion,
      },
      {
        name: 'Verif. Accion',
        sortable: true,
        searchable: false,
        selector: row => row.verifAccion,
      },
      {
        name: 'Verif. Efic',
        sortable: true,
        searchable: false,
        selector: row => row.verifEfic,
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => row.estado,
      },
      actionColumn
    ];
    return newColumns;
  }, [actions]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Acciones" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={actions}
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

