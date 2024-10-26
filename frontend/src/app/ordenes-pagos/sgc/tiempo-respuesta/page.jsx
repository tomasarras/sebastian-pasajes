"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateAction from "@/app/components/ordenes-pago/modals/ModalCreateAction";
import Table from "@/app/components/table";
import useIsoReporteGuardias from "@/app/hooks/ordenes-pagos/iso/useIsoReporteGuardias";
import useIsoTiempoRespuestas from "@/app/hooks/ordenes-pagos/iso/useIsoTiempoRespuestas";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { formatDate } from "@/app/utils/utils";
import React, { useEffect, useMemo, useState } from "react";


export default function OrdenesPagoTiempoRespuesta() {
  const tiemposRespuesta = useIsoTiempoRespuestas()
  const [porcentaje, setPorcentaje] = useState('')
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("tiempo respuesta")

  const handleOnDelete = async () => {
    //TODO
  }

  useEffect(() => {
    let total = 0
    let eficaces = 0
    for (let tr of tiemposRespuesta) {
      const hora1 = tr.hora1 == '00:00' ? '' : tr.hora1
      const hora2 = tr.hora2 == '00:00' ? '' : tr.hora2
      if (!(hora1 == '' || hora2 == ''))
        total++
      const demora = getDemora(tr)
      if (demora <= 60)
        eficaces++
    }
    if (total == 0) {
      setPorcentaje('')
      return
    }
    eficaces = (eficaces / total) * 100;
    setPorcentaje(eficaces.toFixed(2));
  },[tiemposRespuesta])

  const formatHora = hora => {
    if (hora == '00:00') return ''
    return hora.substring(0, 5);
  }

  const getDemora = row => {
    try {
      let [h1, m1, s1] = row.hora1.split(":");
      let [h2, m2, s2] = row.hora2.split(":");
      let minutos1 = parseInt(m1) + parseInt(h1) * 60;
      let minutos2 = parseInt(m2) + parseInt(h2) * 60;

      return minutos2 - minutos1;
    } catch(e) {
      return ''
    }
  }

  const getEficaz = row => {
    try {
      const demora = getDemora(row)
      const hora1 = row.hora1 == '00:00' ? '' : row.hora1
      const hora2 = row.hora2 == '00:00' ? '' : row.hora2
      if (hora1 === '' || hora2 === '') {
        return ''
      } else {
        return demora > 60
          ? 'NO' //TODO: 'font-weight:bold;color:#f44336'
          : 'SI'//TODO: 'font-weight:bold;color:#4CAF50'
      }
    } catch (e) {
      return ''
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
        name: 'Cliente',
        sortable: true,
        searchable: false,
        selector: row => row?.cliente?.nombre,
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: false,
        selector: row => formatDate(row.fecha),
      },
      {
        name: 'Fecha R.',
        sortable: true,
        searchable: false,
        selector: row => formatHora(row.hora1),
      },
      {
        name: 'Fecha E.',
        sortable: true,
        searchable: false,
        selector: row => formatHora(row.hora2),
      },
      {
        name: 'Demora',
        sortable: true,
        searchable: false,
        selector: row => getDemora(row),
      },
      {
        name: 'Vendedor',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      {
        name: 'Eficaz',
        sortable: true,
        searchable: false,
        selector: row => getEficaz(row),
      },
      actionColumn
    ];
    return newColumns;
  }, [tiemposRespuesta]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Tiempo de Respuesta" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={tiemposRespuesta}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
        <p>{tiemposRespuesta.length} registros | eficacia {porcentaje}%</p>
      </div>
    </div>
    <ModalCreateAction {...createModalProps} />
    <ModalCreateAction action={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.name} {...deleteModalProps}/>
  </Container>
  )
}

