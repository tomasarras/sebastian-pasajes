import React from 'react'
import { STATUS_COLORS, STATUS_ID_TO_CONSTANT_NAME, STATUS_NAME_TO_ID } from '../utils/utils';

const OrderColor = ({ statusId }) => {
  const constantName = STATUS_ID_TO_CONSTANT_NAME[statusId]
  const color = STATUS_COLORS[constantName] || "#000000"
  return (
    <div style={{
      backgroundColor: color
    }} className='w-2 h-2 rounded-full'></div>
  )
}

export default OrderColor