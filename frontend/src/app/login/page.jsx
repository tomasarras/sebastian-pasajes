"use client"
import CommonInput from "../components/commonInput"
import React, { useEffect, useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import SecondaryButton from "../components/buttons/secondaryButton";
import { useRouter } from 'next/navigation'
import StaticHeader from "../components/header/StaticHeader";
import * as userService from '../services/userService'
import Warning from "../components/alerts/Warning";
import { useSearchParams } from 'next/navigation';
import useToggle from "../hooks/useToggle";
import illustration from "../../../public/travel-illustration-secondary.png"
import Image from "next/image";

export default function Login() {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const searchParams = useSearchParams();
  const [showPass, setShowPass] = useState(false);
  const [isInavlidPasswordOrUsername, setIsInavlidPasswordOrUsername] = useState(false)
  const router = useRouter();
  const [isSessionExpired, expireSession] = useToggle()

  useEffect(() => {
    const isExpired = searchParams.has('expired');
    if (isExpired)
      expireSession()
  }, [searchParams]);

  const login = async () => {
    try {
      await userService.login(user, pass)
      router.push('/ordenes');
    } catch (e) {
      setIsInavlidPasswordOrUsername(true)
    }
  }

  return (
    <div className="bg-gray-75 min-h-screen min-w-screen">
      <StaticHeader className="absolute"/>
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-4/6 grid grid-cols-2 bg-white shadow rounded">
          <div className="col-span-1 flex items-center justify-center rounded-l">
            <Image src={illustration} alt="ilustracion" />
          </div>
          <div className="col-span-1 bg-yellow-75 grid content-center p-6 md:p-10 font-normal space-y-2 md:space-y-3">
            <div className="text-xl md:text-2xl">¡Bienvenido!</div>
            <div className="text-sm md:text-md">Sistema de Gestión de Ordenes de Pasajes de Sebastián & Co</div>
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
            <SecondaryButton actionText="INGRESAR" onClick={login} /> 
          </div>
        </div>
        {isSessionExpired &&
          <div className="mt-4 w-4/6 shadow">
            <Warning
              title="Sesión expirada"
              description="Su sesión ha expirado, por favor vuelva a iniciar sesión"
            />
          </div>
        }
      </div>
    </div>
  )
}
