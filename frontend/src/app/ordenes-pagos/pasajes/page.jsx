"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import usePasajes from "@/app/hooks/ordenes-pagos/iso/usePasajes";
import useClients from "@/app/hooks/ordenes-pagos/useClients.jsx";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoPasajes() {
  const pasajes = usePasajes()

  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("pasaje devuelto")
  

  const handleOnDelete = async () => {
    //TODO
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha),
      },
      {
        name: 'Pasaje',
        sortable: true,
        searchable: false,
        selector: row => row.nro,
      },
      {
        name: 'Pasajero',
        sortable: true,
        searchable: false,
        selector: row => row.pasajero,
      },
      {
        name: 'Waiber',
        sortable: true,
        searchable: false,
        selector: row => row.w,
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
  }, [pasajes]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Pasajes Devueltos" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={pasajes}
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