import React, { useMemo, useState } from 'react'
import Table from '.'
import { dayOfWeek, formatDate } from '@/app/utils/utils';
import PrimaryButton from '../buttons/ordenes-pago/primaryButton';
import DangerButton from '../buttons/dangerButton';
import * as personalsService from "@/app/services/ordenes-pagos/personalsService";
import useToggle from '@/app/hooks/useToggle';

const LicencesTable = ({ licences, onApprove, onReject }) => {
  const [selectedLicences, setSelectedLicences] = useState([])
  const [clearSelectableRows, toggleSelectableRows] = useToggle()

  const handleRowSelected = ({ selectedRows }) => {
    setSelectedLicences(selectedRows)
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Personal',
        sortable: true,
        searchable: true,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
        //maxWidth: '80px'
      },
      {
        name: 'Fecha',
        sortable: true,
        searchable: true,
        selector: row => formatDate(row.fecha),
        //maxWidth: '80px'
      },
      {
        name: 'Dia',
        sortable: true,
        searchable: true,
        selector: row => dayOfWeek(row.fecha),
        //maxWidth: '80px'
      },
      {
        name: 'Feriado',
        sortable: true,
        searchable: true,
        selector: row => row?.feriado?.nombre,
        //maxWidth: '80px'
      },
      {
        name: 'Licencia',
        sortable: true,
        searchable: true,
        selector: row => row?.tipo?.nombre,
        //maxWidth: '80px'
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: true,
        selector: row => row.idEstado,
        //maxWidth: '80px'
      },
    ];
    return newColumns;
  }, [licences]); 

  const contextActions = useMemo(() => {
    const handleApprove = async () => {    
      await personalsService.approveLicencias(selectedLicences.map(l => l.id));
      toggleSelectableRows()
      onApprove()
    };
    const handleReject = async () => {    
      await personalsService.rejectLicencias(selectedLicences.map(l => l.id));
      toggleSelectableRows()
      onReject()
    };
    return <><PrimaryButton className="px-2 min-w-32 mr-2" actionText="Aprobar" onClick={handleApprove}/>
    <DangerButton className="px-2 min-w-32" actionText="Rechazar" onClick={handleReject}/></>
  }, [licences, selectedLicences]);

  return (
    <Table
      contextMessage={{ singular: 'licencia', plural: 'licencias', message: 'seleccionadas' }}
      title="Licencias"
      className="shadow"
      columns={columns}
      clearSelectedRows={clearSelectableRows}
      data={licences}
      striped
      contextActions={contextActions}
      onSelectedRowsChange={handleRowSelected} 
      responsive
      selectableRows
      pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
    />
  )
}

export default LicencesTable