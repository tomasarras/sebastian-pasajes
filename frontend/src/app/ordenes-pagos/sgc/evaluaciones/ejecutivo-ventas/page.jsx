"use client"
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateCourse from "@/app/components/ordenes-pago/modals/ModalCreateCourse";
import Table from "@/app/components/table";
import useIsoEvaluacionEjecutivoVentas from "@/app/hooks/ordenes-pagos/iso/useIsoEvaluacionEjecutivoVentas";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { formatDate } from "@/app/utils/utils";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoEvaluacionesEjecutivoVentas() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("ejecutivo venta")
  const evaluacionesEjecutivoVentas = useIsoEvaluacionEjecutivoVentas()

  const handleOnDelete = async () => {
    //TODO
  }

  const getResultado = row => {
    let cantitems = 0;
    let sumaitems = 0;
    for (let i = 1; i < 12; i++) {
      let opt2 = 'c' + i; // obtiene campo
      let value = row[opt2]; // asume que 'row' es un objeto o arreglo
      if (value === 'B' || value === 'R' || value === 'M') {
        cantitems += 1; // cuenta items evaluados
      }
      if (value === 'B') {
        sumaitems += 1;
      }
      if (value === 'R') {
        sumaitems += 0.5;
      }
    }
    return cantitems > 0 ? ((sumaitems / cantitems) * 100).toFixed(2) + '%' : ''
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
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha1),
      },
      {
        name: 'Personal',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal1.apellido} ${row?.personal1.nombre}`,
      },
      {
        name: 'Proxima',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha2),
      },
      {
        name: 'Resultado',
        sortable: true,
        searchable: false,
        selector: row => getResultado(row),
      },
      actionColumn
    ];
    return newColumns;
  }, [evaluacionesEjecutivoVentas]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Evaluacion Ejecutivos Ventas" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={evaluacionesEjecutivoVentas}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateCourse {...createModalProps} />
    <ModalCreateCourse course={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}

