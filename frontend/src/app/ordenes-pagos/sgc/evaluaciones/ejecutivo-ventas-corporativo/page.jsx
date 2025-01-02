"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import ModalCreateCourse from "@/app/components/ordenes-pago/modals/ModalCreateCourse";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import useIsoCourses from "@/app/hooks/ordenes-pagos/iso/useIsoCourses";
import useIsoEncuestasCor from "@/app/hooks/ordenes-pagos/iso/useIsoEncuestasCor";
import useIsoEvaluacionEjecutivoVentasCoorporativo from "@/app/hooks/ordenes-pagos/iso/useIsoEvaluacionEjecutivoVentasCoorporativo";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { evaluarEncuesta, formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { removeEvaluationEjecutivoVentasCoorporativo } from "@/app/services/ordenes-pagos/iso/isoEvaluacionesService";

export default function OrdenesPagoEvaluacionesEjecutivoVentasCoorporativo() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("ejecutivo venta coorporativo")
  const {isoEvaluacionesVentasCoorporativo, fetchIsoEvaluacionesVentasCoorporativo} = useIsoEvaluacionEjecutivoVentasCoorporativo()


  const handleOnDelete = async () => {
    await removeEvaluationEjecutivoVentasCoorporativo(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Evaluación de ejecutivo de ventas corporativo eliminada exitosamente!');
    await fetchIsoEvaluacionesVentasCoorporativo();
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
  }, [isoEvaluacionesVentasCoorporativo]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Evaluacion Ejecutivos Corporativo" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoEvaluacionesVentasCoorporativo}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateCourse {...createModalProps} />
    <ModalCreateCourse course={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la evaluación de ejecutivo de ventas corporativo" {...deleteModalProps}/>
  </Container>
  )
}

