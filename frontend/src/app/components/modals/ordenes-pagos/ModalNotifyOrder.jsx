"use client"
import React, { useState } from 'react';
import Modal from "../modal";
import PrimaryButton from "../../buttons/ordenes-pago/primaryButton";
import * as ordersService from '../../../services/ordenes-pagos/ordersService';
import { useContext } from 'react';
import { Context } from '@/app/context/OPContext';
import Loader from '../../loader/loader';

const ModalNotifyOrder = ({ order, ...props }) => {
  const { changeAlertStatusAndMessage } = useContext(Context);
  const [isNotifingOrder, setIsNotifingOrder] = useState(false)
  if (!order) return
  const isValidDate = order.fechaP != '' && order.fechaP != '0000-00-00'
  const isValidFiles = order.archivos.length > 0
  const isValidOrder = isValidDate && isValidFiles

  const handleNotify = async () => {
    try {
      setIsNotifingOrder(true)
      const result = await ordersService.notifyOrder(order.id);
      setIsNotifingOrder(false)
      const roles = [];
      if (result.operador) roles.push("operador");
      if (result.user) roles.push("personal");
      if (result.vendedor) roles.push("vendedor");
    
      const message = `Se envió notificación al ${roles.join(", ").replace(/, ([^,]*)$/, " y $1")}`;
      changeAlertStatusAndMessage(true, 'success', message);
      props.close();
    } catch (error) {
      console.error('Error al enviar la notificación:', error);
      changeAlertStatusAndMessage(true, 'error', 'Error al enviar la notificación');
    }
  };

  return (
    <Modal title="Notificar Orden" {...props}>
      <div className="p-6">
        <p className="text-lg text-gray-700 mb-8">
          {isValidOrder && "¿Desea enviar el aviso de pago al Operador y Personal?"}
          {!isValidDate && "Por favor, complete Fecha de pago para poder notificar esta orden"}
          <br></br>
          {!isValidFiles && "Por favor, adjunte un comprobante para poder notificar esta orden"}
        </p>

        <div className="flex justify-end gap-4">
          <PrimaryButton
            outline
            actionText="Cancelar"
            onClick={props.close}
            className="bg-gray-500 hover:bg-gray-600"
          />
          <PrimaryButton
            disabled={!isValidOrder || isNotifingOrder}
            actionText={isNotifingOrder ? <span className='flex justify-center'><Loader /></span> : "Enviar"}
            onClick={handleNotify}
            className="bg-blue-600 hover:bg-blue-700"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalNotifyOrder; 