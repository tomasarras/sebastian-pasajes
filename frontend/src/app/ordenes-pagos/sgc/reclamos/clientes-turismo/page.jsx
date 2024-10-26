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
import useIsoIndicadores from "@/app/hooks/ordenes-pagos/iso/useIsoIndicadores";
import useIsoReclamosCoorporativos from "@/app/hooks/ordenes-pagos/iso/useIsoReclamosCoorporativos";
import useIsoReclamosTurismo from "@/app/hooks/ordenes-pagos/iso/useIsoReclamosTurismo";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoReclamosClientesCorporativos() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("cliente turismo")
  const reclamosTurismo = useIsoReclamosTurismo()

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
        name: 'Cliente',
        sortable: true,
        searchable: false,
        selector: row => row.cliente,
      },
      {
        name: 'Operador',
        sortable: true,
        searchable: false,
        selector: row => row?.proveedor?.nombre,
      },
      {
        name: 'F.Aptour',
        sortable: true,
        searchable: false,
        selector: row => row.nFA,
      },
      actionColumn
    ];
    return newColumns;
  }, [reclamosTurismo]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Reclamos Cliente Turismo" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={reclamosTurismo}
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

