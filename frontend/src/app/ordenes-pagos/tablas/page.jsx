"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import Link from "next/link";
import React, { useState } from "react";

export default function OrdenesPagoTablas() {
  //TODO: si sobra tiempo: https://www.vondy.com/styled-components-generator--TZSDECsZ
  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Link href="/ordenes-pagos/actividades" className="p-2 flex justify-center border rounded hover:bg-gray-100">Actividades</Link>
        <Link href="/ordenes-pagos/localidades" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Localidades</Link>
        <Link href="/ordenes-pagos/provincias" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Provincias</Link>
        <Link href="/ordenes-pagos/sector" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Sector</Link>
      </div>
    </div>
  </Container>
  )
}
