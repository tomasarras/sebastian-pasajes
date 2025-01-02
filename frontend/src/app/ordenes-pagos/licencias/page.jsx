"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import Table from "@/app/components/table/ordenes-pago";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import * as personalsService from '../../services/ordenes-pagos/personalsService'
import GenericModalDelete from '@/app/components/modals/GenericModalDelete';
import ModalCreateLicenciaTipo from '@/app/components/modals/ordenes-pagos/ModalCreateLicenciaTipo';

export default function Licencias() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("licencia", { enableEdit: false })

  const [licencias, setLicencias] = useState([])

  const fetchData = async () => {
    const licencias = await personalsService.getAllLicenciasTipo()
    setLicencias(licencias)
  }

  const handleOnDelete = async () => {
    await personalsService.deleteLicenciaTipo(selectedEntity.id)
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
  ], [licencias]); 

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <MainHeader 
          mainTitle="Licencias" 
          {...mainHeaderProps} 
        />
        <hr/>
        <div className="py-8 md:py-16">
          <Table
            className="shadow"
            columns={columns}
            data={licencias}
            striped
            responsive
            pagination 
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </div>
      </div>
      <ModalCreateLicenciaTipo onCreate={fetchData} {...createModalProps} />
      <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nombre} {...deleteModalProps}/>
    </Container>
  );
} 