"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table/ordenes-pago";
import { Context } from "@/app/context/OPContext";
import useFilterModal from "@/app/hooks/ordenes-pagos/useFilterModal";
import useProviders from "@/app/hooks/ordenes-pagos/useProviders";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { FILTER_MODAL_FIELD_TYPE } from "@/app/utils/constants";
import Link from "next/link";
import React, { useContext, useEffect, useMemo, useState } from "react";

const additionalColumnsForExcel = [
  {
    name: "CBU",
    selector: row => "CBU: " + row?.cBU,
    hidden: true,
  },
  {
    name: "EMail",
    selector: row => row.eMail,
    hidden: true,
  },
  {
    name: 'CUIT',
    sortable: true,
    searchable: false,
    selector: row => row.tipoIdentificacion + ": " + row.identificacion,
    hidden: true,
  },
  {
    name: "Alta",
    selector: row => row?.fechaAlta,
    hidden: true,
  },
  {
    name: "Baja",
    selector: row => row?.fechaBaja !== '0000-00-00' ? row.fechaBaja : "",
    hidden: true,
  },
]

const filterFields = [
  {
    label: "Nombre",
    name: "Nombre",
    type: FILTER_MODAL_FIELD_TYPE.INPUT,
  },
]

export default function OrdenesPagoOperadores() {
  const [filters, setFilters] = useState(null)
  const [providers, setProviders] = useState([])
  const handleOnSubmitFilter = async (filters) => {
    setFilters(filters)
  }
  const { fetchProviders, deleteProvider } = useContext(Context)
  const { onOpenFilterModal, filterModal } = useFilterModal({ fields: filterFields, entityName: "operador", onApplyFilter: handleOnSubmitFilter })
  const defaultProviders = useProviders()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("operador")

  const fetchData = async () => {
    if (filters == null) {
      setProviders(defaultProviders)
    } else {
      const providers = await fetchProviders(filters)
      setProviders(providers)
    }
  }

  useEffect(() => {
    fetchData()

  }, [filters, defaultProviders])
  

  const handleOnDelete = async () => {
    deleteProvider(selectedEntity.id)
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
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.nombre,
      },
      {
        name: 'Razón social',
        sortable: true,
        searchable: false,
        selector: row => row.apellido,
      },
      {
        name: 'CUIT',
        sortable: true,
        searchable: false,
        selector: row => row.identificacion,
        noExportableColumn: true,
      },
      {
        name: 'CBU',
        sortable: true,
        searchable: false,
        selector: row => row.cBU,
      },
      actionColumn,
      ...additionalColumnsForExcel,
    ];
    return newColumns;
  }, [providers]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader onOpenFilterModal={onOpenFilterModal} mainTitle="Operadores" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={providers}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateOperator {...createModalProps} />
    <ModalCreateOperator operator={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nombre} {...deleteModalProps}/>
    {filterModal}
  </Container>
  )
}

