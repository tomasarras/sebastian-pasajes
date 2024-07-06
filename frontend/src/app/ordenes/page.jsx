"use client"
import React, { useMemo, useState } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { tableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import ModalCreateOrder from "../components/modals/ModalCreateOrder";
import useUnfilteredOrders from "../hooks/userUnfilteredOrders";

export default function Ordenes() {
  const orders = useUnfilteredOrders()
  const createOrderModal = useModal()

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.name,
        //maxWidth: '80px'
      },
      {
        name: 'Acciones',
        minWidth: '180px',
        cell: row => { return (<div className="flex-row"></div>)
      },
      },
    ];
    return newColumns;
}, [orders]); 

  return (
    <>
        <Container>
            <div className="shadow rounded-lg">
                <MainHeader mainTitle="Ordenes de pasajes" onClickActionText={createOrderModal.open} actionText={<span className="flex items-center"><AddIcon className="mr-2" />Agregar Orden</span>} />
                <hr/>
                <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
                  <Table
                    className="shadow"
                    customStyles={tableCustomStyles}
                    columns={columns}
                    data={orders}
                    striped
                    responsive
                    pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                  />
                </div>
            </div>
        </Container>
        <ModalCreateOrder {...createOrderModal}/>
    </>
  )
}
