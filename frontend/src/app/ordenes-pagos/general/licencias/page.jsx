"use client"
import YearCalendar from "@/app/components/calendar/yearCalendar";
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import * as personalsService from "@/app/services/ordenes-pagos/personalsService";
import SelectPersonal from "@/app/components/ordenes-pago/select/selectPersonal";
import React, { useEffect, useMemo, useState } from "react";
import LicencesTable from "@/app/components/table/licencesTable";
import CalendarYearSelector from "@/app/components/ordenes-pago/calendar-year-selector/calendarYearSelector";
import Link from "next/link";
import PrimaryButton from "@/app/components/buttons/ordenes-pago/primaryButton";
import * as excelService from '../../../services/ordenes-pagos/excelService'

export default function OrdenesPagoLicencias() {
  const [selectedPersonal, setSelectedPersonal] = useState(null)
  const [licences, setLicences] = useState([])
  const [licencesByYear, setLicencesByYear] = useState([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [datesToHighlight, setDatesToHighlight] = useState([])
  

  const fetchLicences = async () => {
    const licences = await personalsService.getAllLicencias(selectedPersonal.id)
    setLicences(licences)
  }

  const handleOnChange = async date => {
    if (selectedPersonal == null) return
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11, por eso se suma 1
    const day = String(date.getDate()).padStart(2, '0');
    const parsedDate = `${year}-${month}-${day}`;
    const existingLicence = licences.find(l => l.fecha === parsedDate)
    if (existingLicence) {
      if (existingLicence.idEstado == 'Solicitado') {
        await personalsService.deleteLicencia(existingLicence.id)
        setLicences(licences.filter(l => l.id != existingLicence.id))
      }
    } else {
      const licence = await personalsService.newLicencia({
        idPersonal:selectedPersonal.id,
        fecha: parsedDate,
      })
      setLicences([...licences, licence])
    }
  }

  useEffect(() => {
    if (selectedPersonal != null)
      fetchLicences()
  }, [selectedPersonal])

  useEffect(() => {
    setDatesToHighlight(licences.map((l) => {
      const [year, month, day] = l.fecha.split('-')
      return {
        date: new Date(`${month}/${day}/${year}`),
        tipo: l?.idEstado
      }
    }))
    setLicencesByYear(licences.filter(l => {
      const [licenceYear] = l.fecha.split('-')
      return licenceYear == selectedYear
    }))
  }, [licences, selectedYear])

  const requestVacationsExcel = () => {
    excelService.exportRequestLicences(selectedPersonal.id)
  }

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <CalendarYearSelector selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>
      <div className="flex justify-between">
        <div className="mt-2 max-w-64 my-4">
          <label htmlFor="personal">Personal</label>
          <SelectPersonal id='personal' name='personal' value={selectedPersonal} onChange={setSelectedPersonal} />
        </div>
        <div className="mt-4">
          <Link href="/ordenes-pagos/mis-licencias/plan"><PrimaryButton className="min-w-32 mr-2" actionText="Exportar"/></Link>
          <PrimaryButton disabled={selectedPersonal == null} className="min-w-32" actionText="Imprimir pedido" onClick={requestVacationsExcel}/>
        </div>
      </div>
      <YearCalendar onChange={handleOnChange} year={selectedYear} datesToHighlight={datesToHighlight}/>
      {licencesByYear.length > 0 &&
      <div className="mt-4">
        {selectedPersonal != null && <Link href={`/ordenes-pagos/mis-licencias/verificar-licencias?personal=${selectedPersonal.id}`}>Ver dias disponibles</Link>}

        <LicencesTable licences={licencesByYear} onApprove={fetchLicences} onReject={fetchLicences}/>
        <p>{licencesByYear.length} dias de licencia</p>
      </div>
      }
      
      <p className="mt-2">Para ver un empleado seleccionar el <span className="text-green-600">personal</span> de la lista desplegable</p>
      <p>Para <span className='font-semibold'>registrar</span> o <span className='font-semibold'>borrar</span> un dia, haga <span className="text-green-600">click</span> en el dia correspondiente del calendario</p>
      <p>Para exportar las vacaciones de <span className='font-semibold'>todo</span> el personal, hacer click en el botón <span className="text-green-600">Exportar</span> </p>
    </div>
  </Container>
  )
}