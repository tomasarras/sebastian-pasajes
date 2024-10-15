"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoOperadores() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("operador")
  const operators = [{
    id: '000206',
    name: "Aero SRL",
    razonSocial: 'Aero SRL',
    cuit: '30-70736214-2',
    cbu: '0720099120000000252818',
    
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
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.name,
      },
      {
        name: 'Razon social',
        sortable: true,
        searchable: false,
        selector: row => row.razonSocial,
      },
      {
        name: 'CUIT',
        sortable: true,
        searchable: false,
        selector: row => row.cuit,
      },
      {
        name: 'CBU',
        sortable: true,
        searchable: false,
        selector: row => row.cbu,
      },
      actionColumn
    ];
    return newColumns;
  }, [operators]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Operadores" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={operators}
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

