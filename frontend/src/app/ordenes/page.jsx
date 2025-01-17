"use client"
import React, { useContext, useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { STATUS_ID_TO_NAME } from "../utils/utils";
import { linkeableTableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import ModalCreateOrder from "../components/modals/ModalCreateOrder";
import useUnfilteredOrders from "../hooks/userUnfilteredOrders";
import DeleteIcon from '@mui/icons-material/Delete';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import EditIcon from '@mui/icons-material/Edit';
import TableActionButton from "../components/buttons/tableActionButton";
import CheckIcon from '@mui/icons-material/Check';
import ModalDeleteOrder from "../components/modals/ModalDeleteOrder";
import OrderColor from "../components/orderColor";
import useAuth from "../hooks/useAuth";
import { AGENCY_CLIENT_ID } from "../utils/constants";
import Link from "next/link";
import FilterOrdersModal from "../components/modals/FilterOrdersModal";
import TableFilters from "../components/table/tableFilters";
import * as ordersService from '../services/ordersService'
import ExportToExcelButton from "../components/buttons/exportToExcelButton";
import ModalChangeOrderStatus from "../components/modals/ModalChangeOrderStatus";
import { Context } from "../context/Context";
import { useRouter } from "next/navigation";

export default function Ordenes() {
  
  const orders = useUnfilteredOrders()
  const [filteredOrders, setFilteredOrders] = useState([])
  const [filterOptions, setFilterOptions] = useState(null)
  const auth = useAuth()
  const router = useRouter();
  
  const [selectedOrder, setSelectedOrder] = useState({});
  const createOrderModal = useModal()
  const deleteOrderModal = useModal()
  const editStatusModal = useModal()
  const filtersModal = useModal()

  const openDeleteModal = (order) => {
    setSelectedOrder(order);
    deleteOrderModal.open();
  }

  const openEditStatusModal = (order) => {    
    setSelectedOrder(order);
    editStatusModal.open();
  }

  const filterOrders = async () => {
    setFilteredOrders(await ordersService.getOrders(filterOptions))
  }

  const redirectToOrderDetails = order => router.push(`/ordenes/${order.id}`)

  useEffect(() => {   
    if (filterOptions != null)
      filterOrders()
  }, [filterOptions])

  const onChangeOrder = (order) => {
    if (filterOptions != null)
      filterOrders()
  }
  

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => row.statusId ? <span className="flex items-center"><OrderColor statusId={row.statusId}/><span className="ml-2">{STATUS_ID_TO_NAME[row.statusId]}</span></span> : 'No informado'
      },
      {
        name: 'Número',
        sortable: true,
        searchable: false,
        selector: row => row.number
      },
      {
        name: 'Alta',
        sortable: true,
        searchable: false,
        selector: row => row.registrationDate
      },
      {
        name: 'Titular/Pasajero',
        sortable: true,
        searchable: false,
        selector: row => row.passengerType == 'holder' ? 'Titular' : 'Acompañante'
      },
      {
        name: 'Cliente',
        sortable: true,
        searchable: false,
        selector: row => row.client?.businessName
      },
      {
        name: 'Pasajero',
        sortable: true,
        searchable: false,
        selector: row => row.firstName + ' ' + row.lastName
      },
      {
        name: 'Fecha de ida',
        sortable: true,
        searchable: false,
        selector: row => (row.departureDate ? row.departureDate : 'No informada') + (row.departureDateHour ? ' ' + row.departureDateHour : '')
      },
      {
        name: 'Fecha de vuelta',
        sortable: true,
        searchable: false,
        selector: row => (row.returnDate ? row.returnDate : 'No informada') + (row.returnDateHour ? ' ' + row.returnDateHour : '')
      },
      {
        name: 'Acciones',
        maxWidth: '20%',
        cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<PictureAsPdfIcon />} onClick={() => downloadPdf(row.id)} /><TableActionButton actionIcon={<DeleteIcon color="error" />} onClick={() => openDeleteModal(row)} /><TableActionButton actionIcon={<CheckIcon color="success" />} tooltipText="Editar estado" onClick={() => openEditStatusModal(row)} /></div>
      },
    ];
    return newColumns;
  }, [orders, filteredOrders]); 

  const downloadPdf = orderId => ordersService.downloadPdf(orderId)

  const handleExcelExport = async () => {
    try {
      await ordersService.downloadExcel(filterOptions);
    } catch (error) {
      console.error('Error al exportar a Excel:', error);
    }
  };

  const handlePlanillaExport = async () => {
    try {
      await ordersService.downloadPlanilla(filterOptions);
    } catch (error) {
      console.error('Error al exportar a planilla:', error);
    }
  };

  return (
    <>
        <Container>
            <div className="shadow rounded-lg">
                <MainHeader
                  onOpenFilterModal={filtersModal.open}
                  hiddenActionText={auth == null || auth?.client?.id === AGENCY_CLIENT_ID || auth?.isAuditor}
                  mainTitle="Ordenes de pasajes"
                  onClickActionText={createOrderModal.open}
                  actionText={<span className="flex items-center"><AddIcon className="mr-2" />Agregar Orden</span>}
                />
                <hr/>
                <TableFilters filters={filterOptions} setFilters={setFilterOptions}/>
                <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
                  <Table
                    className="shadow"
                    customStyles={linkeableTableCustomStyles}
                    columns={columns}
                    data={filterOptions == null ? orders : filteredOrders}
                    striped
                    responsive
                    pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                    onRowClicked={redirectToOrderDetails}
                  />
                  <div className="mt-4 flex justify-end gap-2">
                    <ExportToExcelButton onClick={handleExcelExport}/>
                    <ExportToExcelButton onClick={handlePlanillaExport} title="Exportar a Planilla"/>
                  </div>
                </div>
            </div>
        </Container>
        <FilterOrdersModal onApplyFilter={setFilterOptions} {...filtersModal}/>
        <ModalCreateOrder {...createOrderModal}/>
        <ModalDeleteOrder order={selectedOrder} cleanSelectedOrder={() => setSelectedOrder({})} {...deleteOrderModal}></ModalDeleteOrder>
        {selectedOrder && Object.keys(selectedOrder).length > 0 && <ModalChangeOrderStatus onChangeOrder={onChangeOrder} order={selectedOrder} {...editStatusModal}/>}
    </>
  )
}
