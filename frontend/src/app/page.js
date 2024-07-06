"use client";
import React, { useEffect, useState } from 'react';
import { redirect } from 'next/navigation'
import useModal from './hooks/useModal';
import ModalCreateOrder from './components/modals/ModalCreateOrder';
import Link from 'next/link';
import ModalDeleteOrder from './components/modals/ModalDeleteOrder';
import ModalChangeOrderStatus from './components/modals/ModalChangeOrderStatus';
import ModalCreateProvince from './components/modals/ModalCreateProvince';
import ModalCreateLocation from './components/modals/ModalCreateLocation';

export default function Home() {
  const createOrderModal = useModal()
  const deleteOrderModal = useModal()
  const changeOrderStatusModal = useModal()
  const createProvinceModal = useModal()
  const createLocationModal = useModal()

  return (<>
  <div className='flex flex-col'>

    <button onClick={createOrderModal.open}>Agregar orden</button>
    <button onClick={deleteOrderModal.open}>Borrar orden</button>
    <button onClick={changeOrderStatusModal.open}>Cambiar estado de orden</button>
    <button onClick={createProvinceModal.open}>Crear provincia</button>
    <button onClick={createLocationModal.open}>Crear localidad</button>
    <Link href="/modificar-orden?id=1">Modificar orden</Link>
  </div>

    <ModalCreateOrder {...createOrderModal}></ModalCreateOrder>
    <ModalCreateProvince {...createProvinceModal}></ModalCreateProvince>
    <ModalCreateLocation {...createLocationModal}></ModalCreateLocation>
    <ModalDeleteOrder order={{"passengerType": "holder", firstName: "Tomas", lastName:"Arras", client: { businessName: "ISSN TURISMO"}, number: "123", registrationDate: "2012-01-10" }} {...deleteOrderModal}></ModalDeleteOrder>
    <ModalChangeOrderStatus order={{statusId: 2,"passengerType": "holder", firstName: "Tomas", lastName:"Arras", client: { businessName: "ISSN TURISMO"}, number: "123", registrationDate: "2012-01-10" }} {...changeOrderStatusModal}></ModalChangeOrderStatus>
  </>)
}
