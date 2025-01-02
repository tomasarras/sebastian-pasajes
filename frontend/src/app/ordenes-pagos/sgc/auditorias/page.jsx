"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAuditory from "@/app/components/ordenes-pago/modals/ModalCreateAuditory";
import Table from "@/app/components/table";
import useIsoAud from "@/app/hooks/ordenes-pagos/iso/useIsoAud";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { compareDates, formatDate } from "@/app/utils/utils";
import React, { useMemo, useState } from "react";
import { remove, newAuditory, update } from "@/app/services/ordenes-pagos/iso/isoAudService";


export default function OrdenesPagoAuditorias() {
  const { isoAud, fetchIsoAud } = useIsoAud();
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("auditoria")

  const handleOnDelete = async () => {
    await remove(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Auditoría eliminada exitosamente!');
    await fetchIsoAud();
}

  const formatEstado = auditoria => {
    const { idEstado } = auditoria
    return idEstado == 1
     ? 'PROG' //TODO: AZUL
     : 'CUMPL'//TODO: VERDE
  }

  const formatDetalle = auditoria => {
    const { idEstado, fechaProg, fechaReal } = auditoria
    if (idEstado != 1 && idEstado != 2)
      return ''
    if (fechaProg != '0000-00-00' && fechaReal != '0000-00-00') {//cumplido
      let fechaProgDate = new Date(fechaProg)
      let fechaRealDate = new Date(fechaReal)
      return compareDates(fechaRealDate, fechaProgDate) == 1
        ? 'NO PUNTUAL'
        : 'PUNTUAL'
    }
    if (fechaProg != '0000-00-00' && fechaReal == '0000-00-00') {//programado
      let fechaProgDate = new Date(fechaProg)
      return compareDates(fechaProgDate, new Date()) == 2
        ? 'VENCIDO'// TODO: bold y color f44336
        : 'VIGENTE'
    }
  }

  const createAuditory = async (auditory) => {
    try {
      await newAuditory(auditory)
      changeAlertStatusAndMessage(true, 'success', 'Auditoría creada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al crear la auditoría');
    }
  }

  const editAuditory = async (action) => {
    try {
      await update(action)
      changeAlertStatusAndMessage(true, 'success', 'Auditoría editada exitosamente!');
    } catch (error) {
      console.error('Error al agregar:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al editar la auditoría');
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
        name: 'Programada',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaProg),
      },
      {
        name: 'Realizada',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaReal),
      },
      {
        name: 'Sector',
        sortable: true,
        searchable: false,
        selector: row => row?.sector?.nombre,
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => formatEstado(row),
      },
      {
        name: 'Detalle',
        sortable: true,
        searchable: false,
        selector: row => formatDetalle(row),
      },
      actionColumn
    ];
    return newColumns;
  }, [isoAud]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Auditorías" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoAud}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateAuditory onSubmit={(auditory) => createAuditory(auditory)} {...createModalProps} />
    <ModalCreateAuditory onSubmit={(auditory) => editAuditory(auditory)} auditory={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la auditoría" {...deleteModalProps} />
  </Container>
  )
}

