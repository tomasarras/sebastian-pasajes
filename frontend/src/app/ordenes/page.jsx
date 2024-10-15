"use client"
import React, { useMemo, useState } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { STATUS_ID_TO_NAME } from "../utils/utils";
import { tableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import ModalCreateOrder from "../components/modals/ModalCreateOrder";
import useUnfilteredOrders from "../hooks/userUnfilteredOrders";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableActionButton from "../components/buttons/tableActionButton";
import CheckIcon from '@mui/icons-material/Check';
import ModalDeleteOrder from "../components/modals/ModalDeleteOrder";
import ModalEditOrder from "../components/modals/ModalEditOrder";

export default function Ordenes() {
  const orders = useUnfilteredOrders()
  const [selectedOrder, setSelectedOrder] = useState({});
  const createOrderModal = useModal()
  const deleteOrderModal = useModal()
  const editOrderModal = useModal()

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    deleteOrderModal.open();
  }

  const openEditModal = (order) => {    
    setSelectedOrder(order);
    editOrderModal.open();
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => row.statusId ? STATUS_ID_TO_NAME[row.statusId] : 'No informado',
        //maxWidth: '80px'
      },
      {
        name: 'Número',
        sortable: true,
        searchable: false,
        selector: row => row.id,
        //maxWidth: '80px'
      },
      {
        name: 'Alta',
        sortable: true,
        searchable: false,
        selector: row => row.registrationDate,
        //maxWidth: '80px'
      },
      {
        name: 'Cliente',
        sortable: true,
        searchable: false,
        selector: row => row.client?.businessName,
        //maxWidth: '80px'
      },
      {
        name: 'Pasajero',
        sortable: true,
        searchable: false,
        selector: row => row.firstName + ' ' + row.lastName,
        //maxWidth: '80px'
      },
      {
        name: 'Fecxha de ida',
        sortable: true,
        searchable: false,
        selector: row => (row.departureDate ? row.departureDate : 'No informada') + (row.departureDateHour ? ' ' + row.departureDateHour : ''),
        //maxWidth: '80px'
      },
      {
        name: 'Fecha de vuelta',
        sortable: true,
        searchable: false,
        selector: row => (row.returnDate ? row.returnDate : 'No informada') + (row.returnDateHour ? ' ' + row.returnDateHour : ''),
        //maxWidth: '80px'
      },
      {
        name: 'Acciones',
        maxWidth: '20%',
        cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<EditIcon color="primary" />} onClick={() => openEditModal(row)} /><TableActionButton actionIcon={<DeleteIcon color="error" />} onClick={() => openDeleteModal(row)} /><TableActionButton actionIcon={<CheckIcon color="success" />} tooltipText="Editar estado" onClick={() => openDeleteModal(row)} /></div>
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
        <ModalEditOrder order={selectedOrder} cleanSelectedOrder={() => setSelectedOrder({})} {...editOrderModal}></ModalEditOrder>
        <ModalDeleteOrder order={selectedOrder} cleanSelectedOrder={() => setSelectedOrder({})} {...deleteOrderModal}></ModalDeleteOrder>
    </>
  )
}
