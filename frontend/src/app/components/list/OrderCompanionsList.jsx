import React, { useMemo } from 'react'
import Table from '../table'
import { linkeableTableCustomStyles } from '../../../../utils'
import Link from 'next/link'; 
import { useRouter } from 'next/navigation';

export const OrderCompanionsList = ({ order, addCompanionButton }) => {
  const router = useRouter();
  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Numero',
        sortable: true,
        searchable: true,
        selector: row => row.number
      },
      {
        name: 'Alta',
        sortable: true,
        searchable: true,
        selector: row => row.registrationDate
      },
      {
        name: 'Pasajero',
        sortable: true,
        searchable: true,
        selector: row => `${row.firstName} ${row.lastName}`
      },
      {
        name: 'Documento',
        sortable: false,
        searchable: true,
        selector: row => `${row.documentType} ${row.document}`
      },
      {
        name: 'Transporte',
        sortable: false,
        searchable: true,
        selector: row => row.transportType
      },
      {
        name: 'Teléfonos',
        sortable: false,
        searchable: true,
        selector: row => row.phones
      },
    ];
    return newColumns;
  }, [order]);

  const redirectToOrderDetails = order => router.push(`/ordenes/${order.id}`)

  return (<><div className='mb-4'>{addCompanionButton}</div>
    <Table
      className="shadow"
      customStyles={linkeableTableCustomStyles}
      columns={columns}
      data={order.companions}
      noDataComponent="No hay acompañantes"
      striped
      onRowClicked={redirectToOrderDetails}
      responsive
      pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
    /></>
  )
}
