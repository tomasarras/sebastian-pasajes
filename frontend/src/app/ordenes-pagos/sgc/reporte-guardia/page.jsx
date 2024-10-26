"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import Table from "@/app/components/table";
import useIsoReporteGuardias from "@/app/hooks/ordenes-pagos/iso/useIsoReporteGuardias";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { formatDate } from "@/app/utils/utils";
import React, { useMemo } from "react";


export default function OrdenesPagoReporteGuardias() {
  const reportes = useIsoReporteGuardias()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("reporte guardia")

  const handleOnDelete = async () => {
    //TODO
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
        selector: row => formatDate(row.fecha),
      },
      {
        name: 'Personal',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      {
        name: 'Recibió',
        sortable: true,
        searchable: false,
        selector: row => row.recibio,
      },
      {
        name: 'Cancelación',
        sortable: true,
        searchable: false,
        selector: row => row.cancela,
      },
      actionColumn
    ];
    return newColumns;
  }, [reportes]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Reporte de Guardia" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={reportes}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateAction {...createModalProps} />
    <ModalCreateAction action={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}

