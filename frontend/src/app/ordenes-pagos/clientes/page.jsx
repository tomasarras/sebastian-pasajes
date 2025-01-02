"use client"
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateClient from "@/app/components/modals/ordenes-pagos/ModalCreateClient";
import Table from "@/app/components/table/ordenes-pago";
import useClients from "@/app/hooks/ordenes-pagos/useClients.jsx";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import React, { useContext, useMemo, useState } from "react";
import * as clientsService from '../../services/ordenes-pagos/clientsService'
import { Context } from "@/app/context/OPContext";

const additionalColumnsForExcel = [
  {
    name: "Nombre Fantasía",
    selector: row => row?.apellido,
    hidden: true,
  },
  {
    name: "Alta",
    selector: row => row?.fechaAlta,
    hidden: true,
  },
  {
    name: "Baja",
    selector: row => row?.fechaBaja !== '0000-00-00' ? row.fechaBaja : '',
    hidden: true,
  },
  {
    name: "Identificación",
    selector: row => row?.tipoIdentificacion + ": " + row?.identificacion,
    hidden: true,
  },
  {
    name: "Cond.IVA",
    selector: row => row?.condicionIva?.nombre,
    hidden: true,
  },
  {
    name: "Dirección",
    selector: row => row?.direccion,
    hidden: true,
  },
  {
    name: "Provincia",
    selector: row => row?.provincia,
    hidden: true,
  },
  {
    name: "CP",
    selector: row => row?.cP,
    hidden: true,
  },
  {
    name: "EMail",
    selector: row => row?.email,
    hidden: true,
  },
  {
    name: "Actividad",
    selector: row => row?.actividad?.nombre,
    hidden: true,
  },
  {
    name: "Observaciones",
    selector: row => row?.obs,
    hidden: true,
  },
  // {//TODO: hacer en algun momento (no en este sprint, es largo se tiene que devolver del back)
  //   name: "Teléfonos",
  //   selector: row => row?.email,
  //   hidden: true,
  // },
]

export default function OrdenesPagoClientes() {
  const clients = useClients()
  const { deleteClient } = useContext(Context)

  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("cliente")
  

  const handleOnDelete = async () => {
    deleteClient(selectedEntity.id)
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
        noExportableColumn: true,
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
      actionColumn,
      ...additionalColumnsForExcel,
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
    <ModalCreateClient {...createModalProps} />
    <ModalCreateClient client={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nombre} {...deleteModalProps}/>
  </Container>
  )
}