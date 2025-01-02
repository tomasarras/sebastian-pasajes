"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import useAuth from "@/app/hooks/ordenes-pagos/useAuth";
import { USER_ROLE } from "@/app/utils/constants";
import Link from "next/link";
import React, { useState } from "react";


export default function OrdenesPagoEncuestas() {

  const userData = useAuth()
  const hasPermission = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER, USER_ROLE.ENCUSTA_SATISFACCION].includes(userData?.role)
  const isAdmin = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER].includes(userData?.role)

  //TODO: si sobra tiempo: https://www.vondy.com/styled-components-generator--TZSDECsZ
  return (
    <Container>
      {hasPermission &&
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {isAdmin && <Link href="/ordenes-pagos/sgc/encuestas/corporativos" className="p-2 flex justify-center border rounded hover:bg-gray-100">Corporativos</Link>}
          {isAdmin && <Link href="/ordenes-pagos/sgc/encuestas/ISSN" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">ISSN</Link>}
          <Link href="/ordenes-pagos/sgc/encuestas/turismo" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Turismo</Link>
          <Link href="/ordenes-pagos/sgc/encuestas/resultados-turismo" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Resultados Turismo</Link>
        </div>
      </div>
      }
    </Container>
  )
}
