import React from 'react'

const DangerAlert = ({ title, subtitle, text }) => {
  return (
    <div role="alert">
      <h2 className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
        {title}
      </h2>
      <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
        {subtitle && subtitle != '' && <h3 className="font-medium rounded-t mb-2">{subtitle}</h3>}
        <p>{text}</p>
      </div>
    </div>
  )
}

export default DangerAlert