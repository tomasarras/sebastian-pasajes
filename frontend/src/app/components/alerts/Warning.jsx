import React from 'react'

const Warning = ({ className, title, description }) => {
  return (
    <div className={`bg-orange-100 border-l-4 border-orange-500 text-orange-700 p-4 ${className}`} role="alert">
      <p className="font-bold">{title}</p>
      <p>{description}</p>
    </div>
  )
}

export default Warning