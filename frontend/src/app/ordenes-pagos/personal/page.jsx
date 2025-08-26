"use client"
import SecondaryButton from "@/app/components/buttons/secondaryButton";
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreatePersonal from "@/app/components/ordenes-pago/modals/ModalCreatePersonal";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table/ordenes-pago";
import { Context } from "@/app/context/OPContext";
import useFilterModal from "@/app/hooks/ordenes-pagos/useFilterModal";
import usePersonals from "@/app/hooks/ordenes-pagos/usePersonals";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { FILTER_MODAL_FIELD_TYPE } from "@/app/utils/constants";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useMemo, useState } from "react";

const additionalColumnsForExcel = [
  {
    name: 'Número',
    selector: row => row.id,
    hidden: true,
  },
  {
    name: 'Nombre',
    selector: row => row.nombre + " " + row.apellido,
    hidden: true,
  },
  {
    name: "Alta",
    selector: row => row?.fechaAlta,
    hidden: true,
  },
  {
    name: "Baja",
    selector: row => row?.fechaBaja !== '0000-00-00' ? row.fechaBaja : '',
    hidden: true,
  },
  {
    name: "Identificación",
    selector: row => row?.tipoIdentificacion + ": " + row.identificacion,
    hidden: true,
  },
  {
    name: 'Documento',
    selector: row => row.tipoDocumento + ": " + row.documento,
    hidden: true,
  },
  {
    name: 'Email',
    selector: row => row.eMail,
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

export default function OrdenesPagoPersonal() {
  const { deletePersonal, fetchPersonals } = useContext(Context) 
  const [filters, setFilters] = useState(null)
  const [personals, setPersonals] = useState([])
  const router = useRouter();
  const handleOnSubmitFilter = async (filters) => {
    setFilters(filters)
  }
  const { onOpenFilterModal, filterModal } = useFilterModal({ fields: filterFields, entityName: "personal", onApplyFilter: handleOnSubmitFilter })
  const defaultPersonals = usePersonals()
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("personal")

  const handleOnDelete = async () => {
    deletePersonal(selectedEntity.id)
  }

  const fetchData = async () => {
    let data;
    if (filters == null) {
      data = [...defaultPersonals];
    } else {
      data = await fetchPersonals(filters);
    }
    
    // Ordenar los datos: primero los que no están dados de baja, luego los que sí
    data.sort((a, b) => {
      // Verificar si tiene fecha de baja válida (diferente de '0000-00-00' o vacía)
      const aHasBaja = a.fechaBaja && a.fechaBaja !== '0000-00-00';
      const bHasBaja = b.fechaBaja && b.fechaBaja !== '0000-00-00';
      
      if (aHasBaja === bHasBaja) {
        // Si ambos tienen el mismo estado de baja, mantener el orden original
        return 0;
      }
      // Los que no están dados de baja van primero
      return aHasBaja ? 1 : -1;
    });
    
    setPersonals(data);
  }

  useEffect(() => {
    fetchData()

  }, [filters, defaultPersonals])

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Legajo',
        sortable: true,
        searchable: false,
        selector: row => row.id,
        noExportableColumn: true,
      },
      {
        name: 'Apellido',
        sortable: true,
        searchable: false,
        selector: row => row.apellido,
        noExportableColumn: true,
      },
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.nombre,
        noExportableColumn: true,
      },
      {
        name: 'Documento',
        sortable: true,
        searchable: false,
        selector: row => row.documento,
        noExportableColumn: true,
      },
      {
        name: 'CUIT/CUIL',
        sortable: true,
        searchable: false,
        selector: row => row.identificacion,
        noExportableColumn: true,
      },
      {
        name: 'Puesto',
        sortable: true,
        searchable: false,
        selector: row => row?.puesto?.nombre,
      },
      {
        name: 'Email',
        sortable: true,
        searchable: false,
        selector: row => row.eMail,
      },
      actionColumn,
      ...additionalColumnsForExcel,
    ];
    return newColumns;
  }, [personals]); 

  const headerButtons = 
    <Link href="/ordenes-pagos/personal/tablas">
      <SecondaryButton className="mr-2" size="sm" actionText={"Tablas"} />
    </Link>
  ;

  const redirectToOrderDetails = personal => router.push(`/ordenes-pagos/personal/${personal.id}`)

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader 
        mainTitle="Personal" 
        headerButton={headerButtons}
        onOpenFilterModal={onOpenFilterModal}
        {...mainHeaderProps} 
      />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          onRowClicked={redirectToOrderDetails}
          className="shadow"
          columns={columns}
          data={personals}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreatePersonal {...createModalProps} />
    <ModalCreatePersonal personal={selectedEntity} {...editModalProps} />
    {filterModal}
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.nombre} {...deleteModalProps}/>
  </Container>
  )
}

