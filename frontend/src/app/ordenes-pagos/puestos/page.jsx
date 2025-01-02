"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import Table from "@/app/components/table/ordenes-pago";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import GenericModalDelete from '@/app/components/modals/GenericModalDelete';
import ModalCreatePuesto from '@/app/components/modals/ordenes-pagos/ModalCreatePuesto';
import * as personalsService from '../../services/ordenes-pagos/personalsService';

export default function Puestos() {
  const [puestos, setPuestos] = useState([]);

  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("puesto", { enableEdit: false })

  const fetchData = async () => {
    const puestos = await personalsService.getAllPuestos()
    setPuestos(puestos)
  }

  const handleOnDelete = async () => {
    await personalsService.deletePuesto(selectedEntity.id)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = useMemo(() => [
    {
      name: 'Nombre',
      sortable: true,
      selector: row => row.nombre,
    },
    actionColumn
  ], []); 

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <MainHeader 
          mainTitle="Puestos" 
          {...mainHeaderProps} 
        />
        <hr/>
        <div className="py-8 md:py-16">
          <Table
            className="shadow"
            columns={columns}
            data={puestos}
            striped
            responsive
            pagination 
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </div>
      </div>
      <ModalCreatePuesto onCreate={fetchData} {...createModalProps} />
      <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nombre} {...deleteModalProps}/>
    </Container>
  );
} 