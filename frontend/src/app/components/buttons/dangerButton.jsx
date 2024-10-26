import React from 'react'

const DangerButton = ({ actionText, onClick, outline = false, className }) => {
  return (
    <button onClick={onClick} type="button" className={`py-2 md:py-3 px-auto text-white text-sm md:text-md shadow rounded focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium ${className}`}>
      {actionText}
    </button>
  )
}

export default DangerButton