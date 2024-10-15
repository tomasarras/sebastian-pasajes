"use client"
import React, { useContext } from "react";
import { Context } from "../../context/Context";
import { formatDateWithSlash } from "@/app/utils/functions"
import Modal from "./modal"
import Input from "../form/input/input"
import { deleteOrder } from "@/app/services/ordersService";
import CommonLabel from "../commonLabel"

export default function ModalDeleteOrder({ order, cleanSelectedOrder, ...props }) {
  const { changeAlertStatusAndMessage, fetchOrders } = useContext(Context);

  const handleOnDelete = async () => {
    await deleteOrder(group.id);
    changeAlertStatusAndMessage(true, 'success', 'Orden eliminada exitosamente!');
    await fetchOrders();
    cleanSelectedOrder();
    props.close()
  }
  return <Modal title={`Eliminar Orden`} {...props}>
    <div className="max-w-lg">
      <div className="mt-2">
        <p className="text-sm text-gray-500">¿Desea eliminar la orden <span className="font-bold">N°{order?.number}</span> creada el <span className="font-bold">{formatDateWithSlash(order?.registrationDate)}</span> por el cliente <span className="font-bold">{order?.client?.businessName}</span></p>
      </div>
      <div className="mt-2 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <CommonLabel>Pasajero</CommonLabel>
          <Input disabled readOnly value={`${order?.firstName} ${order?.lastName}`} className={"mb-2"} />
        </div>
        <div>
          <CommonLabel>Tipo pasajero</CommonLabel>
          <Input disabled readOnly value={order?.passengerType == "holder" ? "Titular" : order?.passengerType == "companion" ? "Acompañante" : order?.passengerType} className={"mb-2"} />

        </div>
      </div>
      <div className="bg-gray-50 pt-4 sm:flex sm:flex-row-reverse">
        <button type="button" onClick={handleOnDelete} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Eliminar</button>
        <button type="button" onClick={props.close} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
      </div>
    </div>
  </Modal>
}
