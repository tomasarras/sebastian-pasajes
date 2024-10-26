import React, { useState } from 'react'
import Select from '../../form/select/select'
import usePersonals from '@/app/hooks/ordenes-pagos/usePersonals'

const SelectPersonal = ({value, ...rest}) => {
  const personals = usePersonals()
  const getOptionLabel = personal => `${personal.apellido} ${personal.nombre}`
  const onChange = e => {
    const selected = personals.find(p => getOptionLabel(p) === e.target.value)
    rest.onChange(selected)
  }
  return (
    <Select placeholder='Seleccionar' {...rest} onChange={onChange} options={personals} getOptionLabel={getOptionLabel}/>
  )
}

export default SelectPersonal