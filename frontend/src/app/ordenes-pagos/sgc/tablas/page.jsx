"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import Link from "next/link";
import React, { useState } from "react";


export default function OrdenesPagoTiempoSgcTablas() {
  //TODO: si sobra tiempo: https://www.vondy.com/styled-components-generator--TZSDECsZ
  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/ordenes-pagos/sgc/tablas/criterios" className="p-2 flex justify-center border rounded hover:bg-gray-100">Criterios Auditoria</Link>
          <Link href="/ordenes-pagos/sgc/tablas/cursos" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Formadores Cursos</Link>
          <Link href="/ordenes-pagos/sgc/tablas/origen" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Origen Accion</Link>
          <Link href="/ordenes-pagos/sgc/tablas/procesos" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Procesos</Link>
          <Link href="/ordenes-pagos/sgc/tablas/tipo-documentos" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Tipo Documentos</Link>
          <Link href="/ordenes-pagos/sgc/tablas/cursos-temas" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Temas Cursos</Link>
        </div>
      </div>
    </Container>
  )
}
