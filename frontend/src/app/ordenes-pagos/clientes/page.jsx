"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useClients from "@/app/hooks/ordenes-pagos/useClients.jsx";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoClientes() {
  const clients = useClients()

  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("cliente")
  

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
        name: 'Razón Social',
        sortable: true,
        searchable: false,
        selector: row => row.nombre,
      },
      {
        name: 'Actividad',
        sortable: true,
        searchable: false,
        selector: row => row?.actividad?.nombre,
      },
      {
        name: 'CUIT',
        sortable: true,
        searchable: false,
        selector: row => row.identificacion,
      },
      {
        name: 'Localidad',
        sortable: true,
        searchable: false,
        selector: row => row?.localidad?.nombre,
      },
      {
        name: 'Cond. IVA',
        sortable: true,
        searchable: false,
        selector: row => row?.condicionIva?.nombre,
      },
      actionColumn
    ];
    return newColumns;
  }, [clients]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Clientes" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={clients}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateOperator {...createModalProps} />
    <ModalCreateOperator operator={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}