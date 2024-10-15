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
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useMemo, useState } from "react";

export default function OrdenesPagoCapacitaciones() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("curso")
  const courses = [{
    id: '000010',
    curso: "Amadeus",
    tema: 'Sistema de pago con tarjeta de credito',
    sector: 'Corporativo',
    fecha: '17-10-2017',
    fechaBaja: '',
  }]

  const handleOnDelete = async () => {
    //TODO
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Numero',
        sortable: true,
        searchable: false,
        selector: row => row.id,
      },
      {
        name: 'Curso',
        sortable: true,
        searchable: false,
        selector: row => row.curso,
      },
      {
        name: 'Tema',
        sortable: true,
        searchable: false,
        selector: row => row.tema,
      },
      {
        name: 'Sector',
        sortable: true,
        searchable: false,
        selector: row => row.sector,
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => row.fecha,
      },
      {
        name: 'Fecha Baja',
        sortable: true,
        searchable: false,
        selector: row => row.fechaBaja,
      },
      actionColumn
    ];
    return newColumns;
  }, [courses]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Cursos" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={courses}
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

