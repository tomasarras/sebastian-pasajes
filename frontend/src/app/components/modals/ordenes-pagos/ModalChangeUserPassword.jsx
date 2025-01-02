"use client"
import React, { useContext, useState } from 'react';
import { Context } from '@/app/context/OPContext';
import Modal from '../modal';
import PrimaryButton from '../../buttons/ordenes-pago/primaryButton';
import CommonLabel from '../../commonLabel';
import Input from '../../form/input/input';

export default function ModalChangeUserPassword(props) {
  const { changeAlertStatusAndMessage, changeUserPassword } = useContext(Context);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const changePassword = async () => {
    if (password !== confirmPassword) {
      changeAlertStatusAndMessage(true, 'error', 'Las contraseñas no coinciden');
      return;
    }
    if (password.length < 8) {
      changeAlertStatusAndMessage(true, 'error', 'La contraseña debe tener al menos 8 caracteres');
      return;
    }
    if (!/\d/.test(password)) {
      changeAlertStatusAndMessage(true, 'error', 'La contraseña debe contener al menos un número');
      return;
    }
    if (!/[a-zA-Z]/.test(password)) {
      changeAlertStatusAndMessage(true, 'error', 'La contraseña debe contener al menos una letra');
      return;
    }
    try {
      await changeUserPassword(password, props.user)
      changeAlertStatusAndMessage(true, 'success', 'Contraseña cambiada exitosamente!');
      setPassword("")
      setConfirmPassword("")
      props.close();
    } catch (error) {
      console.log(error);
      changeAlertStatusAndMessage(true, 'error', 'Error al cambiar la contraseña');
    }
  }

  return <Modal title={`Cambiar contraseña`} {...props}>
  {props.user &&
    <div className="max-w-lg divide-y">
      <div className="mt-2">
        <div className="mt-2 grid grid-cols-1 w-96">
          <div>
            <CommonLabel>Usuario</CommonLabel>
            <Input disabled readOnly value={props.user.usuario} className={"mb-2"} />
          </div>
          <div>
            <CommonLabel>Nombre</CommonLabel>
            <Input disabled readOnly value={props.user?.personal?.nombre} className={"mb-2"} />
          </div>
          <div>
            <CommonLabel>Apellido</CommonLabel>
            <Input disabled readOnly value={props.user?.personal?.apellido} className={"mb-2"} />
          </div>
        </div>
      </div>
      <div className="mt-2 grid grid-cols-1">
        <div className='mt-2'>
          <CommonLabel>Contraseña</CommonLabel>
          <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={"mb-2"} />
        </div>
        <div>
          <CommonLabel>Confirmar contraseña</CommonLabel>
          <Input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className={"mb-2"} />
        </div>
      </div>
      <div className="w-full mt-2 grid grid-cols-1 gap-4">
        <PrimaryButton className={`w-full`} actionText={"Cambiar contraseña"} onClick={changePassword} />
      </div>
    </div>
  }
</Modal>
}
