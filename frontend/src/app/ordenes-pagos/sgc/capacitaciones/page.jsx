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
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { formatDate } from "@/app/utils/utils";
import Link from "next/link";
import React, { useMemo, useState } from "react";
import { remove, newCourse, update } from "@/app/services/ordenes-pagos/iso/isoCoursesService";
import SecondaryButton from "@/app/components/buttons/secondaryButton";

export default function OrdenesPagoCapacitaciones() {
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("curso")
  const { isoCourses, fetchIsoCourses } = useIsoCourses();

  const handleOnDelete = async () => {
    await remove(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Capacitación eliminada exitosamente!');
    await fetchIsoCourses();
  }

  const createCourse = async (course) => {
    try {
      await newCourse(course)
      changeAlertStatusAndMessage(true, 'success', 'Curso creado exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear el curso');
    }
  }

  const editCourse = async (course) => {
    try {
      await update(course)
      changeAlertStatusAndMessage(true, 'success', 'Curso editado exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al editar el curso');
    }
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
        name: 'Curso',
        sortable: true,
        searchable: false,
        selector: row => row.titulo,
      },
      {
        name: 'Tema',
        sortable: true,
        searchable: false,
        selector: row => row?.tema?.nombre,
      },
      {
        name: 'Sector',
        sortable: true,
        searchable: false,
        selector: row => row?.sector?.nombre,
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaAlta),
      },
      {
        name: 'Fecha Baja',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaBaja),
      },
      actionColumn
    ];
    return newColumns;
  }, [isoCourses]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader headerButton={<Link href="/ordenes-pagos/sgc/capacitaciones/programacion"><SecondaryButton className="mr-2" size="sm" actionText={"Programar"} /></Link>} mainTitle="Cursos" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoCourses}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateCourse onSubmit={(course) => createCourse(course)} {...createModalProps} />
    <ModalCreateCourse onSubmit={(course) => editCourse(course)} course={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la capacitación" {...deleteModalProps}/>
  </Container>
  )
}

