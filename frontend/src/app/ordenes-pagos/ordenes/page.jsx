"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoOrdenes() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("orden")
  const orders = [{
    id: '007931',
    operador: "Tower hotel ne",
    alta: '14-10-2024',
    pasajero: 'Moreno Viviann',
    usuario: 'Sanchez Ju',
    vendedor: 'Sanchez Ju',
    NFA: '1',
    NFO: '96061',
    pago: '',
    estado: 'pendiente',
    importe: 'USD 1.089,04'
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
        name: 'Alta',
        sortable: true,
        searchable: false,
        selector: row => row.alta,
      },
      {
        name: 'Operador',
        sortable: true,
        searchable: false,
        selector: row => row.operador,
      },
      {
        name: 'Pasajero',
        sortable: true,
        searchable: false,
        selector: row => row.pasajero,
      },
      {
        name: 'Usuario',
        sortable: true,
        searchable: false,
        selector: row => row.usuario,
      },
      {
        name: 'Vendedor',
        sortable: true,
        searchable: false,
        selector: row => row.vendedor,
      },
      {
        name: 'NFA',
        sortable: true,
        searchable: false,
        selector: row => row.NFA,
      },
      {
        name: 'NFO',
        sortable: true,
        searchable: false,
        selector: row => row.NFO,
      },
      {
        name: 'Pago',
        sortable: true,
        searchable: false,
        selector: row => row.pago,
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => row.estado,
      },
      {
        name: 'Importe',
        sortable: true,
        searchable: false,
        selector: row => row.importe,
      },
      actionColumn
    ];
    return newColumns;
  }, [orders]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Ordenes" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={orders}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateOrder {...createModalProps} />
    <ModalCreateOrder order={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}
