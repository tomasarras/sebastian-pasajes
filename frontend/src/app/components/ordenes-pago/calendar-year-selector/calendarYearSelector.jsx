import React from 'react'

const CalendarYearSelector = ({ selectedYear, setSelectedYear }) => {
  return (
    <div className="flex justify-between px-4 py-2 rounded text-white bg-op">
      <div className="cursor-pointer" onClick={() => setSelectedYear(selectedYear-1)}>Anterior</div>
      <div>{selectedYear}</div>
      <div className="cursor-pointer" onClick={() => setSelectedYear(selectedYear+1)}>Siguiente</div>
    </div>
  )
}

export default CalendarYearSelector