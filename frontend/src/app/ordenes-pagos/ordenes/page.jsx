"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useOrders from "@/app/hooks/ordenes-pagos/useOrders";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoOrdenes() {
  const orders = useOrders()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("orden")
  

  const handleOnDelete = async () => {
    //TODO
  }

  const formatImporte = opago => {
    const isDolar = opago.moneda == 1
    let formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return `${isDolar ? 'USD ' : '$'}${formatter.format(opago.importe).slice(1)}`
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
        name: 'Alta',
        sortable: true,
        searchable: false,
        selector: row => row.fecha,
      },
      {
        name: 'Operador',
        sortable: true,
        searchable: false,
        selector: row => row?.operador?.nombre,
      },
      {
        name: 'Pasajero',
        sortable: true,
        searchable: false,
        selector: row => row.cliente,
      },
      {
        name: 'Usuario',
        sortable: true,
        searchable: false,
        selector: row => `${row?.usuario?.personal?.apellido} ${row?.usuario?.personal?.nombre}`,
      },
      {
        name: 'Vendedor',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      {
        name: 'NFA',
        sortable: true,
        searchable: false,
        selector: row => row.nFA,
      },
      {
        name: 'NFO',
        sortable: true,
        searchable: false,
        selector: row => row.nFO,
      },
      {
        name: 'Pago',
        sortable: true,
        searchable: false,
        selector: row => row.fechaP,
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => row?.estado?.nombre,
      },
      {
        name: 'Importe',
        sortable: true,
        searchable: false,
        selector: row => formatImporte(row),
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
