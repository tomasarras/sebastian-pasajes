"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useProvinces from "@/app/hooks/ordenes-pagos/useProvinces";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoProvincias() {
  const provinces = useProvinces()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("provincia")

  const handleOnDelete = async () => {
    //TODO
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.nombre,
        //maxWidth: '80px'
      },
      actionColumn
    ];
    return newColumns;
  }, [provinces]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Provincias" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={provinces}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateProvince {...createModalProps} />
    <ModalCreateProvince province={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}
