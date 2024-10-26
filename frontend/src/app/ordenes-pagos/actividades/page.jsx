"use client"
import AddItemButton from "@/app/components/buttons/addItemButton";
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ModalCreateActivity from "@/app/components/ordenes-pago/modals/ModalCreateActivity";
import Table from "@/app/components/table";
import useModal from "@/app/hooks/useModal";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import TableActionButton from "@/app/components/buttons/tableActionButton";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import useActivities from "@/app/hooks/ordenes-pagos/useActivities";

export default function OrdenesPagoActividades() {
  const activities = useActivities();
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("actividad")

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
  }, [activities]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Actividades" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          //customStyles={tableCustomStyles}
          columns={columns}
          data={activities}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateActivity {...createModalProps} />
    <ModalCreateActivity activity={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}
