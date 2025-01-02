"use client"
import TableActionButton from "@/app/components/buttons/tableActionButton";
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreatePasaje from "@/app/components/modals/ordenes-pagos/ModalCreatePasaje";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table/ordenes-pago";
import CancelIcon from '@mui/icons-material/Cancel';
import DoneIcon from '@mui/icons-material/Done';
import usePasajes from "@/app/hooks/ordenes-pagos/iso/usePasajes";
import useClients from "@/app/hooks/ordenes-pagos/useClients.jsx";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useContext, useMemo, useState } from "react";
import useAuth from "@/app/hooks/ordenes-pagos/useAuth";
import { TICKET_STATUS, USER_ROLE } from "@/app/utils/constants";
import { Context } from "@/app/context/OPContext";

const additionalColumnsForExcel = [
  {
    name: "Observaciones",
    selector: row => row?.obs,
    hidden: true,
  },
  {
    name: "Usuario",
    selector: row => row?.personal?.apellido + " " + row?.personal?.nombre,
    hidden: true,
  },
  {
    name: "Pasaje",
    selector: row => "$" + row?.imp1,
    hidden: true,
  },
  {
    name: "Penalidad",
    selector: row => "$" + row?.imp2,
    hidden: true,
  },
]

export default function OrdenesPagoPasajes() {
  const { approvePasaje, cancelPasaje, deletePasaje } = useContext(Context)
  const pasajes = usePasajes()
  const userData = useAuth()
  const isAdmin = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER].includes(userData?.role)

  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("pasaje devuelto", {
    conditionalDelete: (row) => isAdmin && row.estado == TICKET_STATUS.PENDING,
    withActions: (row) => isAdmin && <>
      {row.estado === TICKET_STATUS.PENDING && <TableActionButton tooltipText="Aprobar" actionIcon={<DoneIcon />} onClick={() => approvePasaje(row.id)} />}
      {row.estado === TICKET_STATUS.APPROVED && <TableActionButton tooltipText="Cancelar aprobar" actionIcon={<CancelIcon />} onClick={() => cancelPasaje(row.id)} />}
      </>
  })
  

  const handleOnDelete = async () => {
    await deletePasaje(selectedEntity.id)
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
      actionColumn,
      ...additionalColumnsForExcel,
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
    <ModalCreatePasaje {...createModalProps} />
    <ModalCreatePasaje pasaje={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nro} {...deleteModalProps}/>
  </Container>
  )
}