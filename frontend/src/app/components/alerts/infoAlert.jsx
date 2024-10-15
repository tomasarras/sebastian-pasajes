import React from 'react'

const InfoAlert = ({ title, subtitle, text }) => {
  return (
    <div className="bg-blue-100 border-t border-b border-blue-500 text-blue-700 px-4 py-3" role="alert">
      <h2 className="font-bold">{title}</h2>
      {subtitle && subtitle != '' && <h3 className="font-medium">{subtitle}</h3>}
      <p className="text-sm mt-2">{text}</p>
    </div>
  )
}

export default InfoAlert