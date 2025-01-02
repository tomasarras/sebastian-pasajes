"use client"
import React, { useEffect, useMemo, useState } from 'react';
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import Table from "@/app/components/table/ordenes-pago";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import GenericModalDelete from '@/app/components/modals/GenericModalDelete';
import ModalCreateDocumento from '@/app/components/modals/ordenes-pagos/ModalCreateDocumento';
import * as documentosService from '../../../services/ordenes-pagos/iso/isoDocumentosService';
import useFilterModal from '@/app/hooks/ordenes-pagos/useFilterModal';
import { FILTER_MODAL_FIELD_TYPE, USER_ROLE } from '@/app/utils/constants';
import useIsoDocEstados from '@/app/hooks/ordenes-pagos/iso/useIsoDocEstados';
import useIsoDocProcesos from '@/app/hooks/ordenes-pagos/iso/useIsoDocProcesos';
import useAuth from '@/app/hooks/ordenes-pagos/useAuth';
import Link from 'next/link';


export default function OrdenesPagoDocumentos() {
  const userData = useAuth()
  const [documentos, setDocumentos] = useState([]);
  const [filterParams, setFilterParams] = useState({})
  const estados = useIsoDocEstados()
  const procesos = useIsoDocProcesos()
  const isAdmin = userData?.role === USER_ROLE.ADMIN || userData?.role === USER_ROLE.WEBMASTER

  const filterFields = [
    {
      label: "Id",
      name: "Id",
      type: FILTER_MODAL_FIELD_TYPE.INPUT,
    },
    {
      label: "Codigo",
      name: "Codigo",
      type: FILTER_MODAL_FIELD_TYPE.INPUT,
    },
    {
      label: "Nombre",
      name: "Nombre",
      type: FILTER_MODAL_FIELD_TYPE.INPUT,
    },
    {
      label: "Estado",
      name: "IdEstado",
      type: FILTER_MODAL_FIELD_TYPE.SELECT,
      values: estados,
      getOptionLabel: estado => estado.nombre,
    },
    {
      label: "Proceso",
      name: "IdProc",
      type: FILTER_MODAL_FIELD_TYPE.SELECT,
      values: procesos,
      getOptionLabel: proceso => proceso.nombre,
    },
  ]
  const handleOnSubmitFilter = async (values) => {
    if ("IdProc" in values)
      values.IdProc = procesos.find(p => p.nombre == values.IdProc).id
    if ("IdEstado" in values)
      values.IdEstado = estados.find(e => e.nombre == values.IdEstado).id
    setFilterParams(values)
  }

  const { onOpenFilterModal, filterModal } = useFilterModal({ fields: filterFields, entityName: "acciones", onApplyFilter: handleOnSubmitFilter })
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("documento")

  const fetchData = async (params) => {
    const docs = await documentosService.getAllDocumentos(params)
    setDocumentos(docs)
  }

  const handleOnDelete = async () => {
    await documentosService.deleteDocumento(selectedEntity.id)
    fetchData(filterParams)
  }

  useEffect(() => {
    fetchData(filterParams)
  }, [filterParams])

  const columns = useMemo(() => [
    {
      name: 'Número',
      sortable: true,
      selector: row => isAdmin ? <Link href={"documentos/" + row.id}>{row.id}</Link> : row.id,
    },
    {
      name: 'Código',
      sortable: true,
      selector: row => isAdmin ? <Link href={"documentos/" + row.id}>{row.codigo}</Link> : row.codigo,
    },
    {
      name: 'Vs',
      sortable: true,
      selector: row => isAdmin ? <Link href={"documentos/" + row.id}>{row.version}</Link> : row.version,
    },
    {
      name: 'Alta',
      sortable: true,
      selector: row => isAdmin ? <Link href={"documentos/" + row.id}>{row.fechaAPR}</Link> : row.fechaAPR,
    },
    {
      name: 'Nombre',
      sortable: true,
      selector: row => isAdmin ? <Link href={"documentos/" + row.id}>{row.nombre}</Link> : row.nombre,
    },
    {
      name: 'Proceso',
      sortable: true,
      selector: row => isAdmin ? <Link href={"documentos/" + row.id}>{row?.proceso?.nombre}</Link> : row?.proceso?.nombre,
    },
    {
      name: 'Estado',
      sortable: true,
      selector: row => isAdmin ? <Link href={"documentos/" + row.id}>{row?.estado?.nombre}</Link> : row?.estado?.nombre,
    },
    actionColumn
  ], [documentos]); 

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <MainHeader 
          onOpenFilterModal={onOpenFilterModal}
          mainTitle="Documentos" 
          {...mainHeaderProps} 
        />
        <hr/>
        <div className="py-8 md:py-16">
          <Table
            className="shadow"
            columns={columns}
            data={documentos}
            striped
            responsive
            pagination 
            paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          />
        </div>
      </div>
      {filterModal}
      {/* <ModalCreateDocumento {...createModalProps} />
      <ModalCreateDocumento documento={selectedEntity} {...editModalProps} />
      <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nombre} {...deleteModalProps}/> */}
    </Container>
  );
}
