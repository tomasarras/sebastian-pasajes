"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import ModalCreateWithSimpleName from "@/app/components/ordenes-pago/modals/ModalCreateWithSimpleName";
import Table from "@/app/components/table";
import useUsers from "@/app/hooks/ordenes-pagos/useUsers";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoUsuarios() {
  const users = useUsers()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("usuario")

  const handleOnDelete = async () => {
    //TODO
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      {
        name: 'Usuario',
        sortable: true,
        searchable: false,
        selector: row => row.usuario,
      },
      {
        name: 'Puesto',
        sortable: true,
        searchable: false,
        selector: row => row.puesto,
      },
      {
        name: 'Perfil',
        sortable: true,
        searchable: false,
        selector: row => row?.perfil?.nombre,
      },
      {
        name: 'Fecha Baja',
        sortable: true,
        searchable: false,
        selector: row => row.fechaBaja,
      },
      actionColumn
    ];
    return newColumns;
  }, [users]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Usuarios" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={users}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateWithSimpleName {...createModalProps} />
    <ModalCreateWithSimpleName entity={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}

