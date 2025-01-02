import React, { useState, useEffect } from 'react'
import DynamicForm from '../DynamicForm'

const formFields = [
  {
    name: 'FechaProg',
    label: 'Fecha Programada',
    required: true,
    type: "date",
    className: 'w-full'
  },
  {
    name: 'FechaReal',
    label: 'Fecha Real',
    type: "date",
    className: 'w-full'
  },
  {
    name: 'IdSector',
    label: 'Sector',
    type: "select",
    required: true,
    options: [
      { value: 1, label: 'Pendiente' },
      { value: 2, label: 'En Proceso' },
      { value: 3, label: 'Completada' }
    ],
    className: 'w-full'
  },
  {
    name: 'IdEstado',
    label: 'Estado',
    required: true,
    type: "select",
    options: [
      { value: 1, label: 'Pendiente' },
      { value: 2, label: 'En Proceso' },
      { value: 3, label: 'Completada' }
    ],
    className: 'w-full'
  },
  {
    name: 'Observaciones',
    label: 'Observaciones',
    isTextArea: true,
    rows: 4,
    className: 'w-full'
  },
  {
    name: 'Resultado',
    label: 'Resultado',
    isTextArea: true,
    rows: 4,
    className: 'w-full'
  },
  {
    name: 'Auditor',
    label: 'Auditor',
    type: 'input',
    required: true,
    className: 'w-full'
  },
  {
    name: 'Auditado',
    label: 'Auditado',
    type: 'input',
    required: true,
    className: 'w-full'
  }
]

const IsoAudForm = ({ initialData, onSubmit, isEdit = false }) => {
  const [first, setfirst] = useState('');


  return (
    <DynamicForm
      fields={formFields}
      initialData={initialData}
      onSubmit={onSubmit}
      isEdit={isEdit}
      title={isEdit ? 'Editar auditoría' : 'Nueva auditoría'}
    />
  )
}

export default IsoAudForm 