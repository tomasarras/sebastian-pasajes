import React from 'react'

const Section = ({ children, disabled = false, title }) => (
  <div className={`rounded shadow-md mt-4 ${disabled && "bg-gray-200"}`}>
    <div className="bg-primary-900 rounded-ss rounded-se px-4 py-2">
      <h3 className="text-black font-medium">{title}</h3>
    </div>
    <div className={`px-4 py-4`}>
      {children}
    </div>
  </div>
)

export default Section