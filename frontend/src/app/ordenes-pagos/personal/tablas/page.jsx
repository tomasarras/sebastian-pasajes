"use client"
import React from 'react';
import Container from "@/app/components/Container";
import Link from "next/link";

export default function PersonalTables() {

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Link href="/ordenes-pagos/feriados" className="p-2 flex justify-center border rounded hover:bg-gray-100">Feriados</Link>
          <Link href="/ordenes-pagos/licencias" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Licencias</Link>
          <Link href="/ordenes-pagos/puestos" className="p-2 flex justify-center border rounded hover:bg-gray-100 cursor-pointer">Puestos</Link>
        </div>
      </div>
    </Container>
  );
} 