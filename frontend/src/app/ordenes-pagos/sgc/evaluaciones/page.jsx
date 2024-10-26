"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import Link from "next/link";
import React, { useState } from "react";


export default function OrdenesPagoEvaluaciones() {

  //TODO: si sobra tiempo: https://www.vondy.com/styled-components-generator--TZSDECsZ
  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/ordenes-pagos/sgc/evaluaciones/ejecutivo-ventas" className="p-2 flex justify-center border rounded hover:bg-gray-100">Ejecutivo Ventas</Link>
          <Link href="/ordenes-pagos/sgc/evaluaciones/ejecutivo-ventas-corporativo" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Ejecutivo Ventas Corporativo</Link>
          <Link href="/ordenes-pagos/sgc/evaluaciones/administrativo" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Administrativo</Link>
        </div>
      </div>
    </Container>
  )
}
