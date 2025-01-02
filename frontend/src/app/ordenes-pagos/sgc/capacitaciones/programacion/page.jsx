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
import React, { useContext, useMemo, useState } from "react";
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import useIsoCursosProgramacion from "@/app/hooks/ordenes-pagos/iso/useIsoCursosProgramacion";
import { Context } from "@/app/context/OPContext";
import { deleteCursoProgramacion } from "@/app/services/ordenes-pagos/iso/isoTablasService";

export default function OrdenesPagoCapacitacionesProgramacion() {
  const { changeAlertStatusAndMessage } = useContext(Context)
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("programacion")
  const { isoCursoProgramacion, fetchIsoCursoProgramacion } = useIsoCursosProgramacion();

  const handleOnDelete = async () => {
    await deleteCursoProgramacion(selectedEntity.id);
    changeAlertStatusAndMessage(true, 'success', 'Programacion eliminada exitosamente!');
    await fetchIsoCursoProgramacion();
  }

  const formatIdEstado = idEstado => {
    if (idEstado == 1) {
      return <span className="text-blue-300">PROG</span>
    } else {
      return <span className="text-green-400">CUMPL</span>
    }
  }

  const getDetalle = row => {
    function compararFechas(fecha1, fecha2) {
      const [dia1, mes1, anio1] = fecha1.split('-').map(Number);
      const [dia2, mes2, anio2] = fecha2.split('-').map(Number);
    
      const date1 = new Date(anio1, mes1 - 1, dia1);
      const date2 = new Date(anio2, mes2 - 1, dia2);
    
      if (date1 > date2) return 1; // Fecha1 es mayor que Fecha2
      if (date1 < date2) return 2; // Fecha1 es menor que Fecha2
      return 0; // Son iguales
    }
    
    function obtenerDetalle(row) {
      let detalle = '';
      let colordetalle = '';
    
      if (row.fechaProg !== '0000-00-00' && row.fechaReal !== '0000-00-00') {
        // Cumplido
        if (compararFechas(formatearFecha(row.fechaReal), formatearFecha(row.fechaProg)) === 1) {
          detalle = 'NO PUNTUAL';
        } else {
          detalle = 'PUNTUAL';
        }
      }
    
      if (row.fechaProg !== '0000-00-00' && row.fechaReal === '0000-00-00') {
        // Programado
        const hoy = new Date();
        const hoyFormateado = `${String(hoy.getDate()).padStart(2, '0')}-${String(hoy.getMonth() + 1).padStart(2, '0')}-${hoy.getFullYear()}`;
        if (compararFechas(formatearFecha(row.fechaProg), hoyFormateado) === 2) {
          detalle = 'VENCIDO';
          colordetalle = 'text-red-500';
        } else {
          detalle = 'VIGENTE';
        }
      }
    
      return { detalle, colordetalle };
    }
    
    function formatearFecha(fechaISO) {
      // Formatear fecha en formato "yyyy-mm-dd" a "dd-mm-yyyy"
      const [anio, mes, dia] = fechaISO.split('-');
      return `${dia}-${mes}-${anio}`;
    }

    const { detalle, colordetalle } = obtenerDetalle(row);
    
    return <span className={colordetalle}>{detalle}</span>;
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row?.personal?.apellido + " " + row?.personal?.nombre,
      },
      {
        name: 'Curso',
        sortable: true,
        searchable: false,
        selector: row => row?.curso?.titulo,
      },
      {
        name: 'Progr',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaProg),
      },
      {
        name: 'Hora',
        sortable: true,
        searchable: false,
        selector: row => row.hora === '00:00:00' ? row.hora : '',
      },
      {
        name: 'Realiz',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fechaReal),
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => formatIdEstado(row.idEstado),
      },
      {
        name: 'Detalle',
        sortable: true,
        searchable: false,
        selector: row => getDetalle(row),
      },
      {
        name: 'Eval.',
        sortable: true,
        searchable: false,
        selector: row => row.evaluacion === '0.00' ? '' : row.evaluacion,
      },
      {
        name: 'Verif',
        sortable: true,
        searchable: false,
        selector: row => <span className={row.vE == 1 ? '' : 'text-red-500'}>{row.vE == 1 ? 'Si' : 'No'}</span>,
      },
      actionColumn
    ];
    return newColumns;
  }, [isoCursoProgramacion]);

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader headerButton={<Link href="ordenes-pagos/sgc/capacitaciones/programacion"><SecondaryButton className="mr-2" size="sm" actionText={"Programar"} /></Link>} mainTitle="Cursos" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={isoCursoProgramacion}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateCourse {...createModalProps} />
    <ModalCreateCourse course={selectedEntity} {...editModalProps} />
    <GenericModalDelete id={selectedEntity?.id} onDelete={handleOnDelete} label="la capacitación" {...deleteModalProps}/>
  </Container>
  )
}

