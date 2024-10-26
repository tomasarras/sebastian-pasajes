"use client"
import PrimaryButton from '@/app/components/buttons/ordenes-pago/primaryButton'
import YearCalendar from '@/app/components/calendar/yearCalendar'
import Container from '@/app/components/Container'
import CalendarYearSelector from '@/app/components/ordenes-pago/calendar-year-selector/calendarYearSelector'
import { Context } from '@/app/context/OPContext'
import useAuth from '@/app/hooks/ordenes-pagos/useAuth'
import useMyLicencias from '@/app/hooks/ordenes-pagos/useMyLicencias'
import * as personalsService from '@/app/services/ordenes-pagos/personalsService'
import Link from 'next/link'
import React, { useContext, useEffect, useState } from 'react'

const OrdenesPagosMisLicencias = () => {
	const { deleteMyLicence, newMyLicence } = useContext(Context)
	const licences = useMyLicencias()
	const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
	const [datesToHighlight, setDatesToHighlight] = useState([])
	const auth = useAuth()

  const sendRequest = () => {
    personalsService.requestLicences()
  }
	

	const handleOnSelectLicence = async date => {		
		if (auth.idPersonal == null) return
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por eso se suma 1
    const day = String(date.getDate()).padStart(2, '0');
    const parsedDate = `${year}-${month}-${day}`;
    const existingLicence = licences.find(l => l.fecha === parsedDate)
    if (existingLicence) {
      if (existingLicence.idEstado == 'Solicitado') {
        await deleteMyLicence(existingLicence.id)
      }
    } else {
			await newMyLicence(parsedDate)
    }
	}

	useEffect(() => {
    setDatesToHighlight(licences.map((l) => {
      const [year, month, day] = l.fecha.split('-')
      return {
        date: new Date(`${month}/${day}/${year}`),
        tipo: l?.idEstado
      }
    }))
  }, [licences, selectedYear])

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
				<CalendarYearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
				<YearCalendar datesToHighlight={datesToHighlight} year={selectedYear} onChange={handleOnSelectLicence}/>
				<Link href={`/ordenes-pagos/mis-licencias/verificar-licencias?personal=${auth?.idPersonal}`}>Ver dias disponibles</Link>

				
				<p>Las licencias deben comenzar el dia lunes, en caso que sea feriado el 1º dia habil siguiente</p>
				<p>Para seleccionar o borrar un dia, haga click en el dia correspondiente del calendario</p>
				<p>Los dias aprobados no podrán modificarse</p>
        <PrimaryButton className="min-w-32" actionText="Enviar pedido" onClick={sendRequest}/>
			</div>
    </Container>
  )
}

export default OrdenesPagosMisLicencias