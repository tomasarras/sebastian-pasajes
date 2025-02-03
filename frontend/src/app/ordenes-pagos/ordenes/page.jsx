"use client"
import TableActionButton from "@/app/components/buttons/tableActionButton";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import Table from "@/app/components/table/ordenes-pago";
import { Context } from "@/app/context/OPContext";
import useAuth from "@/app/hooks/ordenes-pagos/useAuth";
import useUsers from "@/app/hooks/ordenes-pagos/useUsers";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import useModal from "@/app/hooks/useModal";
import { CURRENCY_ID, FILTER_MODAL_FIELD_TYPE, ISO_NC_STATUS_IDS, ORDER_PAYMENT_STATUS_IDS, USER_ROLE } from "@/app/utils/constants";
import SendIcon from '@mui/icons-material/Send';
import React, { useContext, useEffect, useMemo, useState } from "react";
import ModalNotifyOrder from "@/app/components/modals/ordenes-pagos/ModalNotifyOrder";
import useFilterModal from "@/app/hooks/ordenes-pagos/useFilterModal";
import { ORDER_STATUS_NAME } from "@/app/utils/utils";
import * as XLSX from 'xlsx';
import useProviders from "@/app/hooks/ordenes-pagos/useProviders";

const additionalColumnsForExcel = [
  {
    name: "Razon Social Op.",
    selector: row => row?.operador?.apellido,
    hidden: true,
  },
  {
    name: "CUIT Op.",
    selector: row => row?.operador?.tipoIdentificacion + ": " + row?.operador?.identificacion,
    hidden: true,
  },
  {
    name: "Descripción",
    selector: row => row.des,
    hidden: true,
  },
  {
    name: "Observaciones",
    selector: row => row.obs,
    hidden: true,
  },
  {
    name: "CBU Op.",
    selector: row => "CBU: "+ row?.operador?.cBU,
    hidden: true,
  },
  {
    name: "NºFile Aptour",
    selector: row => row.nFA,
    hidden: true,
  },
  {
    name: "NºFile Operador",
    selector: row => row.nFO,
    hidden: true,
  }
]

export default function OrdenesPagoOrdenes() {
  const providers = useProviders()
  const users = useUsers()
  const [filters, setFilters] = useState(null)
  const [orders, setOrders] = useState([])
  const [totalByPesos, setTotalByPesos] = useState('')
  const [totalByDollars, setTotalByDollars] = useState('')
  const filterStatuses = [{
    label: "Pendiente",
    value: ORDER_PAYMENT_STATUS_IDS.PENDING,
  },
  {
    label: "Pagado",
    value: ORDER_PAYMENT_STATUS_IDS.PAID,
  }]

  const filterFields = [{
    label: "Estado",
    name: "IdEstado",
    type: FILTER_MODAL_FIELD_TYPE.SELECT,
    values: filterStatuses,
  },
  {
    label: "NºFile Aptour",
    name: "NFA",
    type: FILTER_MODAL_FIELD_TYPE.INPUT,
  },
  {
    label: "NºFile Operador",
    name: "NFO",
    type: FILTER_MODAL_FIELD_TYPE.INPUT,
  },
  {
    label: "NºOP",
    name: "Id",
    type: FILTER_MODAL_FIELD_TYPE.INPUT,
  },
  {
    label: "Operador",
    name: "IdOperador",
    type: FILTER_MODAL_FIELD_TYPE.SELECT,
    values: providers,
    getOptionLabel: provider => provider.apellido + " " + provider.nombre,
    getOptionValue: provider => provider.id
  },
  {
    label: "Usuario",
    name: "IdUsuario",
    type: FILTER_MODAL_FIELD_TYPE.SELECT,
    values: users,
    getOptionLabel: user => user.personal.apellido + " " + user.personal.nombre,
    getOptionValue: user => user.usuario
  },
  {
    label: "Fecha alta (desde)",
    name: "from",
    type: FILTER_MODAL_FIELD_TYPE.DATE,
  },
  {
    label: "Fecha alta (hasta)",
    name: "to",
    type: FILTER_MODAL_FIELD_TYPE.DATE,
  },
  {
    label: "Fecha de pago",
    name: "FechaP",
    type: FILTER_MODAL_FIELD_TYPE.DATE,
  },
]
  const handleOnSubmitFilter = async (filters) => {
    setFilters(filters)
  }

  const handleFetchOrders = async () => {
    const orders = await fetchOrders(filters)

    let totalPesos = 0;
    let totalDollars = 0;

    orders.forEach(item => {
      const importe = parseFloat(item.importe)
      if (item.moneda === 0) {
        totalPesos += importe
      } else {
        totalDollars += importe
      }
    });
    setTotalByDollars(formatImporte({ importe: totalPesos, moneda: CURRENCY_ID.DOLLAR }))
    setTotalByPesos(formatImporte({ importe: totalDollars, moneda: CURRENCY_ID.PESO }))

    setOrders(orders)
    return orders
  }

  useEffect(() => {
    handleFetchOrders()
  }, [filters])

  const { onOpenFilterModal, filterModal } = useFilterModal({ fields: filterFields, entityName: "ordenes de pago", onApplyFilter: handleOnSubmitFilter })
  const { deleteOrder, changeAlertStatusAndMessage, fetchOrders } = useContext(Context)
  const notifyModal = useModal()
  const userData = useAuth()
  const isAdmin = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER].includes(userData?.role)

  const openNotifyModal = (order) => {
    notifyModal.open()
    setSelectedEntity(order)
  }
  
  const { 
    mainHeaderProps,
    createModalProps,
    editModalProps,
    deleteModalProps,
    selectedEntity,
    setSelectedEntity,
    actionColumn,
  } = useCRUDModals("orden", { 
    conditionalDelete: order => order?.estado?.id == ORDER_PAYMENT_STATUS_IDS.PENDING && isAdmin,
    withActions: (row) => <TableActionButton 
                            actionIcon={<SendIcon />} 
                            onClick={() => openNotifyModal(row)}
                            tooltipText="Notificar"
                          />
  })
  

  const handleOnDelete = async () => {
    await deleteOrder(selectedEntity.id)
    updateOrders()
    changeAlertStatusAndMessage(true, 'error', 'Orden borrada.');
  }

  const updateOrders = async () => {
    const orders = await handleFetchOrders(filters)
    setOrders(orders)
    try {
      const updatedSelectedEntity = orders.find(o => o.id == selectedEntity.id)
      setSelectedEntity(updatedSelectedEntity || null)
    } catch (e) {}
  }

  const formatImporte = opago => {
    const isDolar = opago.moneda == CURRENCY_ID.DOLLAR
    let formatter = new Intl.NumberFormat('es-CL', {
      style: 'currency',
      currency: 'CLP',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })
    return `${isDolar ? 'USD ' : '$'}${formatter.format(opago.importe).slice(1)}`
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
        name: 'Alta',
        sortable: true,
        searchable: false,
        selector: row => row.fecha,
      },
      {
        name: 'Operador',
        sortable: true,
        searchable: false,
        selector: row => row?.operador?.nombre,
      },
      {
        name: 'Pasajero',
        sortable: true,
        searchable: false,
        selector: row => row.cliente,
      },
      {
        name: 'Usuario',
        sortable: true,
        searchable: false,
        selector: row => `${row?.usuario?.personal?.apellido} ${row?.usuario?.personal?.nombre}`,
      },
      {
        name: 'Vendedor',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      {
        name: 'NFA',
        sortable: true,
        searchable: false,
        selector: row => row.nFA,
      },
      {
        name: 'NFO',
        sortable: true,
        searchable: false,
        selector: row => row.nFO,
      },
      {
        name: 'Pago',
        sortable: true,
        searchable: false,
        selector: row => row.fechaP,
      },
      {
        name: 'Estado',
        sortable: true,
        searchable: false,
        selector: row => row?.estado?.id == ORDER_PAYMENT_STATUS_IDS.PENDING ? <span className="text-red-500">{row?.estado?.nombre}</span> : <span className="text-green-600">{row?.estado?.nombre}</span>,
      },
      {
        name: 'Importe',
        sortable: true,
        searchable: false,
        selector: row => formatImporte(row),
      },
      actionColumn,
      ...additionalColumnsForExcel,
    ];
    return newColumns;
  }, [orders]); 

  const onProcessDataToExport = (data) => {
    const firstRow = data[0]
    const rowKeys = Object.keys(firstRow)
    const emptyRow = {}
    const emptyRow2 = {}
    rowKeys.forEach(key => emptyRow[key] = "")
    rowKeys.forEach(key => emptyRow2[key] = "")
    emptyRow["Importe"] = totalByDollars
    emptyRow2["Importe"] = totalByPesos
    data.push(emptyRow)
    data.push(emptyRow2)
    return data;
  }

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Ordenes" onOpenFilterModal={onOpenFilterModal} {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          onProcessDataToExport={onProcessDataToExport}
          className="shadow"
          columns={columns}
          data={orders}
          striped
          responsive
          footer={<div className="font-bold mr-4"><div>{totalByDollars}</div><div>{totalByPesos}</div></div>}
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
        />
      </div>
    </div>
    <ModalCreateOrder updateOrders={updateOrders} {...createModalProps} />
    <ModalCreateOrder updateOrders={updateOrders} order={selectedEntity} {...editModalProps} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.id} {...deleteModalProps}/>
    <ModalNotifyOrder order={selectedEntity} {...notifyModal} />
    {filterModal}
  </Container>
  )
}
