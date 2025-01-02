"use client"
import ExportToExcelButton from '@/app/components/buttons/exportToExcelButton'
import Container from '@/app/components/Container'
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';
import React, { useEffect, useState } from 'react'
import * as excelService from '../../../services/ordenes-pagos/excelService'
import usePuestos from '@/app/hooks/ordenes-pagos/usePuestos'
import Select from '@/app/components/form/select/select'
import DatePicker from '../../../components/form/input/date/DatePicker'
import { datePickerDateToString } from '@/app/utils/utils'
import CommonLabel from '@/app/components/commonLabel';

const OrdenesPagosMisLicenciasPlan = () => {
  const [selectedPuesto, setSelectedPuesto] = useState(null)
  const [fechaDesde, setFechaDesde] = useState(null)
  const puestos = usePuestos()

  const exportLicencias = () => {
    console.log(fechaDesde);
    
    const formatedFechaDesde = datePickerDateToString(fechaDesde)
    excelService.exportLicencias({
      puesto: selectedPuesto?.id,
      fechaDesde: formatedFechaDesde != '' ? formatedFechaDesde : null,
    })
  }
  
	
  const onChangePuesto = (e) => {
    setSelectedPuesto(puestos.find(puesto => puesto.nombre === e.target.value))
  }

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4 sm:flex">
        <div className='sm:max-w-64'>
          <CommonLabel htmlFor="puesto">Puesto</CommonLabel>
          <Select placeholder='Puesto' id="puesto" name="puesto" onChange={onChangePuesto} options={puestos} getOptionLabel={(puesto) => puesto.nombre}/>
        </div>
        <div className='sm:max-w-64 mt-4 sm:mt-0 sm:ml-2'>
          <CommonLabel htmlFor="puesto">Desde</CommonLabel>
          <DatePicker
            value={fechaDesde}
            onChange={setFechaDesde}
            inputPlaceholder="Desde"
          />
        </div>

        <ExportToExcelButton 
          className="mt-4 sm:mt-0 sm:self-start sm:mt-auto sm:ml-2 
          w-full sm:w-auto flex sm:flex-none justify-center sm:justify-start"
          onClick={exportLicencias}
        />
			</div>
    </Container>
  )
}

export default OrdenesPagosMisLicenciasPlan