"use client"
import DatePicker, { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import Input from '../input';
import { useState } from 'react';

const spanishLocale = {
  months: [
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre',
  ],

  weekDays: [
    {
      name: 'Domingo',
      short: 'D',
      isWeekend: true,
    },
    {
      name: 'Lunes',
      short: 'L',
    },
    {
      name: 'Martes',
      short: 'Ma',
    },
    {
      name: 'Miercoles',
      short: 'Mi',
    },
    {
      name: 'Jueves',
      short: 'J',
    },
    {
      name: 'Viernes',
      short: 'V',
    },
    {
      name: 'Sabado',
      short: 'S',
      isWeekend: true,
    },
  ],

  weekStartingIndex: 0,
  getToday(gregorainTodayObject) {
    return gregorainTodayObject;
  },
  toNativeDate(date) {
    return new Date(date.year, date.month - 1, date.day);
  },
  getMonthLength(date) {
    return new Date(date.year, date.month, 0).getDate();
  },
  transformDigit(digit) {
    return digit;
  },
  nextMonth: 'Mes siguiente',
  previousMonth: 'Mes anterior',
  openMonthSelector: 'Abrir selector de meses',
  openYearSelector: 'Abrir selector de años',
  closeMonthSelector: 'Cerrar selector de meses',
  closeYearSelector: 'Cerrar selector de años',
  defaultPlaceholder: 'Seleccionar...',
  from: 'desde',
  to: 'hasta',
  digitSeparator: ',',
  yearLetterSkip: 0,
  isRtl: false,
}

export default function DateRangePicker({ range = false, calendar = false, ...props }) {
  const [writing, setWriting] = useState('')
  let value = props.value
  if (value != undefined && value != null) {
    value = Object.assign(props.value, {})
    if (typeof value.day == 'string')
      value.day = parseInt(value.day)
    if (typeof value.month == 'string')
      value.month = parseInt(value.month)
  }

  

  const handleOnKeyDown = e => {
    const key = e.key
    
    const isNumber = (!isNaN(key) && key !== " ")
    if (!isNumber && key !== "Backspace") return;
    if (key == 'Backspace') { 
      setWriting('dd/mm/aaaa')
      props.onChange(null)
      return
    }
    let date = writing == '' ? 'dd/mm/aaaa' : writing
    const nextDate = date.replace(/d|m|a/, key);
    if (!nextDate.includes('a')) {
      const [day, month, year] = nextDate.split("/")
      const objectFormat = { day: parseInt(day), month: parseInt(month), year: parseInt(year) }
      props.onChange(objectFormat)
    } else {
      setWriting(nextDate);
    }
  }

  const renderCustomInput = ({ ref }) => {
    let hasSelectedValue = range ? props.value.from && props.value.to : props.value
    const formatDate = (date) => `${date.day}/${date.month}/${date.year}`    
    return <Input
      id={props.id}
      name={props.name}
      onKeyDown={handleOnKeyDown}
      disabled={props.disabled}
      innerRef={ref}
      placeholder={props.inputPlaceholder}
      value={hasSelectedValue ? range ? `${formatDate(props.value.from)} hasta ${formatDate(props.value.to)}` : formatDate(props.value) : writing}
    />
  }

  const componentProps = {
    renderInput: renderCustomInput,
    colorPrimary:"#FAA805",
    colorPrimaryLight:"#FEEECD",
    locale:spanishLocale,
    shouldHighlightWeekends:true,
    ...props,
  }

  return (
    calendar ? <Calendar {...componentProps} /> : <DatePicker {...componentProps}/>)
}
