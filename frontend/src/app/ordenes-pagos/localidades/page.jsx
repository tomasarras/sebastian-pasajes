"use client"
import TableActionButton from "@/app/components/buttons/tableActionButton";
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import Table from "@/app/components/table";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useCRUDModals from "@/app/hooks/useCRUDModals";
import ModalCreateLocality from "@/app/components/ordenes-pago/modals/ModalCreateLocality";
import useProvinces from "@/app/hooks/ordenes-pagos/useProvinces";

export default function OrdenesPagoLocalidades() {
  const provinces = useProvinces()
  const [localities, setLocalities] = useState([])

  useEffect(() => {
    let localities = []
    provinces.forEach(province => localities = [...localities, ...province.localidades])
    setLocalities(localities)
  }, [provinces])
  
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("localidad")

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
      {
        name: 'CP',
        sortable: true,
        searchable: false,
        selector: row => row.cP,
        //maxWidth: '80px'
      },
      {
        name: 'Provincia',
        sortable: true,
        searchable: false,
        selector: row => provinces.find(p => p.id == row.idPcia).nombre,
        //maxWidth: '80px'
      },
      actionColumn
    ];
    return newColumns;
  }, [localities]); 

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <MainHeader mainTitle="Localidades" {...mainHeaderProps} />
        <hr/>
        <div className="py-8 md:py-16">
          <Table
            className="shadow"
            columns={columns}
            data={localities}
            striped
            responsive
            pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </div>
      </div>
      <ModalCreateLocality {...createModalProps} />
      <ModalCreateLocality locality={selectedEntity} {...editModalProps} />
      <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}
