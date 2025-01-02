"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import * as personalsService from '../../services/ordenes-pagos/personalsService'
import Table from "@/app/components/table/ordenes-pago";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import { formatDate, stringDateToDate } from "@/app/utils/utils";
import GenericModalDelete from '@/app/components/modals/GenericModalDelete';
import ModalCreateFeriado from "@/app/components/modals/ordenes-pagos/ModalCreateFeriado";

export default function Feriados() {
  const [feriados, setFeriados] = useState([])
  
  const getDayName = (dateString) => {
    if (!dateString) return
    const days = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 
      'Jueves', 'Viernes', 'Sábado'
    ];
    const date = stringDateToDate(dateString);
    return days[date.getDay()];
  };

  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("feriado", { enableEdit: false })

  const fetchData = async () => {
    const feriados = await personalsService.getAllFeriados()
    setFeriados(feriados)
  }

  const handleOnDelete = async () => {
    await personalsService.deleteFeriado(selectedEntity.id)
    fetchData()
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = useMemo(() => [
    {
      name: 'Fecha',
      sortable: true,
      selector: row => formatDate(row.fecha),
    },
    {
      name: 'Nombre',
      sortable: true,
      selector: row => row.nombre,
    },
    {
      name: 'Dia',
      sortable: true,
      selector: row => getDayName(row.fecha),
    },
    actionColumn
  ], []); 

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <MainHeader 
          mainTitle="Feriados" 
          {...mainHeaderProps} 
        />
        <hr/>
        <div className="py-8 md:py-16">
          <Table
            className="shadow"
            columns={columns}
            data={feriados}
            striped
            responsive
            pagination 
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </div>
      </div>
      <ModalCreateFeriado onCreate={fetchData} {...createModalProps} />
      <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nombre} {...deleteModalProps}/>
    </Container>
  );
} 