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
import DeleteIcon from '@mui/icons-material/Delete';
import usePersonals from "@/app/hooks/ordenes-pagos/usePersonals";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import { FILTER_MODAL_FIELD_TYPE } from "@/app/utils/constants";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import * as personalsService from '../../../services/ordenes-pagos/personalsService'
import React, { useContext, useEffect, useMemo, useState } from "react";
import TableActionButton from "@/app/components/buttons/tableActionButton";
import AddItemButton from "@/app/components/buttons/addItemButton";
import useModal from "@/app/hooks/useModal";
import AddLicenciaModal from "@/app/components/modals/ordenes-pagos/AddLicenciaModal";

export default function OrdenesPagoPersonalDetalle() {
  const params = useParams()
  const [personalData, setPersonalData] = useState(null)
  const [selectedLicence, setSelectedLicence] = useState(null)
  const addLicenciaModal = useModal()
  const deleteLicenceModal = useModal()

  const fetchData = async () => {
    const personal = await personalsService.getById(params.id)
    personal.licencias.sort((a, b) => b.año - a.año);
    setPersonalData(personal)
  }

  const onCreateLicence = (newData) => {
    newData.licencias.sort((a, b) => b.año - a.año);
    setPersonalData(newData)    
  }

  useEffect(() => {
    fetchData()
  }, [])

  const onDeleteLicencia = async (licencia) => {
    deleteLicenceModal.open()
    setSelectedLicence(licencia)
  }

  const handleOnDelete = async () => {
    const newData = await personalsService.deleteLicenceByYear(selectedLicence.id)
    newData.licencias.sort((a, b) => b.año - a.año);
    setPersonalData(newData)
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Año',
        sortable: true,
        searchable: true,
        selector: row => row.año
      },
      {
        name: 'Total dias',
        sortable: true,
        searchable: true,
        selector: row => row.dias
      },
      {
        name: 'Utilizados',
        sortable: true,
        searchable: true,
        selector: row => row.used + ""
      },
      {
        name: 'Pendientes',
        sortable: true,
        searchable: true,
        selector: row => row.saldo
      },
      {
        name: 'Acciones',
        sortable: true,
        searchable: true,
        selector: row => <TableActionButton
        actionIcon={<DeleteIcon color="error" />} 
        onClick={() => onDeleteLicencia(row)}
        tooltipText="Eliminar licencia"
      />
      },
    ];
    return newColumns;
  }, [personalData]);

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader
        actionText={<AddItemButton actionText={`Agregar licencia`}/>} 
        onClickActionText={addLicenciaModal.open}
        mainTitle={`Personal: ${personalData?.nombre} ${personalData?.apellido}`}
      />
      <hr/>
      <div className="py-8 md:py-4">
        <h2>Licencias Vacaciones</h2>
        <Table
          className="shadow"
          columns={columns}
          data={personalData?.licencias || []}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <AddLicenciaModal onCreate={onCreateLicence} idPersonal={params.id} {...addLicenciaModal}/>
    <GenericModalDelete id={params.id} type={"licencia"} label={selectedLicence?.año} onDelete={handleOnDelete} {...deleteLicenceModal}/>
  </Container>
  )
}

