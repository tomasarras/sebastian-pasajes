"use client"
import CommonInput from "@/app/components/commonInput";
import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/navigation'
import * as userService from '../../services/ordenes-pagos/userService.js'
import Header from "@/app/components/ordenes-pago/header/header.jsx";
import Image from "next/image.js";
import illustration from "../../../../public/digital-nomad-v1.png"
import styles from "./login.module.css"
import PrimaryButton from "@/app/components/buttons/ordenes-pago/primaryButton.jsx";

export default function OrdenesPagosLogin() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [isInavlidPasswordOrUsername, setIsInavlidPasswordOrUsername] = useState(false)
  const router = useRouter();

  const login = async () => {
    try {
      await userService.login(user, pass)
      router.push('/ordenes-pagos/inicio');
    } catch (e) {
      setIsInavlidPasswordOrUsername(true)
    }
  }

  return (
  <div className="bg-gray-75">
    <Header/>
    <div className="flex items-center justify-center min-h-screen min-w-screen">
      <div className={`w-4/6 grid grid-cols-2 bg-white shadow rounded`}>
        <div className={`col-span-1 flex items-center justify-center rounded-l ${styles.loginBackground}`}>
          <Image src={illustration} alt="ilustracion" />
        </div>
        <div className={`col-span-1 grid content-center p-6 md:p-10 font-normal space-y-2 md:space-y-3`}>
          <div className="text-xl md:text-2xl">¡Bienvenido!</div>
          <div className="text-sm md:text-md">Sistema de Gestión de Ordenes de Pagos de Sebastián & Co</div>
          <div className="input-icon"><span><PersonIcon color="action" /></span><CommonInput   
                  value={user}
                  name="user"
                  type="text" 
                  placeholder="Usuario" 
                  onChange={(e) => setUser(e.target.value)}
          /></div>
          {!showPass && <div className="input-icon"><button onClick={() => setShowPass(!showPass)} tabIndex="-1"><LockIcon color="action" /></button><CommonInput   
            value={pass}
            name="pass"
            type="password" 
            placeholder="Contraseña" 
            onChange={(e) => setPass(e.target.value)}
          /></div>}
          {showPass && <div className="input-icon"><button onClick={() => setShowPass(!showPass)} tabIndex="-1"><LockOpenIcon color="action" /></button><CommonInput   
            value={pass}
            name="pass"
            type="text" 
            placeholder="Contraseña" 
            onChange={(e) => setPass(e.target.value)}
          /></div>}
          <div className={`${!isInavlidPasswordOrUsername && 'invisible'} text-red-500 text-sm`}>Usuario o contraseña invalidos</div>
          <PrimaryButton actionText="INGRESAR" onClick={login} /> 
        </div>
      </div>
    </div>
  </div>
  )
}
