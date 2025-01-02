"use client"
import React, { useContext } from "react";
import Modal from "./modal"
import { Context } from "../../context/Context";

export default function GenericModalDelete({ id, type, label, onDelete, ...props }) {
  const { changeAlertStatusAndMessage } = useContext(Context);

  const handleOnDelete = async () => {
    changeAlertStatusAndMessage(true, 'success', `${type} eliminado exitosamente!`);
    onDelete();
    props.close()
  }

  return <Modal title={`Eliminar ${type}`} {...props}>
    <div className="max-w-lg">
      <div className="mt-2">
        <p className="text-sm text-gray-500">¿Desea eliminar {label && <span className="font-bold">{label}</span>}?</p>
      </div>
      <div className="bg-gray-50 pt-4 sm:flex sm:flex-row-reverse">
        <button type="button" onClick={handleOnDelete} className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto">Eliminar</button>
        <button type="button" onClick={props.close} className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">Cancelar</button>
      </div>
    </div>
  </Modal>
}
