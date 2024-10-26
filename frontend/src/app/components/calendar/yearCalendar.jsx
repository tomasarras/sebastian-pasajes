import React, { useEffect, useState } from 'react'
import { Calendar as ReactCalendar } from "@natscale/react-calendar";
import "./yearCalendar.css"
import Calendar from 'react-calendar';

const monthsLabel = {
  0: "Enero",
  1: "Febrero",
  2: "Marzo",
  3: "Abril",
  4: "Mayo",
  5: "Junio",
  6: "Julio",
  7: "Agosto",
  8: "Septiembre",
  9: "Octubre",
  10: "Noviembre",
  11: "Diciembre"
};

const isSameDay = (a, b) => {
  return a.getDate() == b.getDate() && a.getMonth() == b.getMonth() && a.getFullYear() == b.getFullYear()
}

const YearCalendar = ({ datesToHighlight = [], year, onChange }) => {

  const tileClassName = ({ date, view }) => {
    const highlightItem = datesToHighlight.find(d => isSameDay(d.date, date))
    if (highlightItem) {
      return `highlight-${highlightItem.tipo}`
    }
  }

  return (
  <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4'>
    {new Array(12).fill("").map((v, i) => {
      const dateString = `${i + 1}/01/${year}`;
      return (
        <Calendar
          tileClassName={tileClassName}
          key={dateString}
          locale='es'
          maxDetail='month'
          minDetail='month'
          next2Label=''
          nextLabel=''
          onChange={onChange}
          formatMonthYear={(locale, date) => monthsLabel[date.getMonth()]}
          value={new Date(dateString)}
        />
      );
    })}
  </div>
  )
}

export default YearCalendar