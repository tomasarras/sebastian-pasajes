"use client"
import DatePicker, { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import Input from '../input';

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

export default function dateRangePicker({ range = false, calendar = false, ...props }) {

  const renderCustomInput = ({ ref }) => {
    let hasSelectedValue = range ? props.value.from && props.value.to : props.value
    const formatDate = (date) => `${date.day}/${date.month}/${date.year}`
    return <Input
      readOnly
      disabled={props.disabled}
      innerRef={ref}
      placeholder={props.inputPlaceholder}
      value={hasSelectedValue ? range ? `${formatDate(props.value.from)} hasta ${formatDate(props.value.to)}` : formatDate(props.value) : ''}
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
