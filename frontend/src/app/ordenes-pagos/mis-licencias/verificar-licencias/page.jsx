"use client"
import { useSearchParams } from 'next/navigation';
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import Table from "@/app/components/table";
import * as personalsService from '../../../services/ordenes-pagos/personalsService'

import React, { useContext, useEffect, useMemo, useState } from "react";
import Input from '@/app/components/form/input/input';
import usePersonals from '@/app/hooks/ordenes-pagos/usePersonals';
import { Context } from '@/app/context/OPContext';
import CommonLabel from '@/app/components/commonLabel';

export default function OrdenesPagosVerificarLicencias() {
	const { fetchPersonals } = useContext(Context)
	const [data, setData] = useState([])
	const searchParams = useSearchParams();
	const [personalFullName, setPersonalFullName] = useState("")

	const fetchData = async (Id) => {
		const data = await personalsService.verificarLicencias(Id);
		const [personal] = await fetchPersonals({ Id })
		setPersonalFullName(personal.apellido + " " + personal.nombre)
		setData(data)
	}

	useEffect(() => {
		const personalId = searchParams.get('personal');
		fetchData(personalId)
	}, [searchParams])
    

  const columns = useMemo(() => {
    const newColumns = [
			{
        name: 'Año',
        sortable: true,
        searchable: true,
        selector: row => row.año,
      },
			{
        name: 'Total dias',
        sortable: true,
        searchable: true,
        selector: row => row.dias,
      },
			{
        name: 'Utilizados',
        sortable: true,
        searchable: true,
        selector: row => row.used,
      },
			{
        name: 'Pendientes',
        sortable: true,
        searchable: true,
        selector: row => row.saldo,
      },
      
    ];
    return newColumns;
  }, []); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
			<div className='max-w-64'>
				<CommonLabel htmlFor="personal">Personal</CommonLabel>
				<Input id="personal" name="personal" value={personalFullName} disabled/>
			</div>
			<Table
				title="Licencias"
				className="shadow"
				columns={columns}
				data={data}
				striped
				responsive
				pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
			/>
		</div>

  </Container>
  )
}
