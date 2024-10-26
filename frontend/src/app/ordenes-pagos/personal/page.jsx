"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreatePersonal from "@/app/components/ordenes-pago/modals/ModalCreatePersonal";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import usePersonals from "@/app/hooks/ordenes-pagos/usePersonals";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoPersonal() {
  const personals = usePersonals()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("personal")


  const handleOnDelete = async () => {
    //TODO
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Legajo',
        sortable: true,
        searchable: false,
        selector: row => row.id,
      },
      {
        name: 'Apellido',
        sortable: true,
        searchable: false,
        selector: row => row.nombre,
      },
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.apellido,
      },
      {
        name: 'Documento',
        sortable: true,
        searchable: false,
        selector: row => row.documento,
      },
      {
        name: 'CUIT/CUIL',
        sortable: true,
        searchable: false,
        selector: row => row.identificacion,
      },
      {
        name: 'Puesto',
        sortable: true,
        searchable: false,
        selector: row => row?.puesto?.nombre,
      },
      {
        name: 'Email',
        sortable: true,
        searchable: false,
        selector: row => row.eMail,
      },
      actionColumn
    ];
    return newColumns;
  }, [personals]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Personal" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={personals}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreatePersonal {...createModalProps} />
    <ModalCreatePersonal personal={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}

