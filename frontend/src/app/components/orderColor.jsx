import React from 'react'
import { STATUS_NAME_TO_ID } from '../utils/utils';

const OrderColor = ({ statusId }) => {
  let color;
  switch (statusId) {
    case STATUS_NAME_TO_ID.OPEN: color = "#FFD35F"; break;
    case STATUS_NAME_TO_ID.CLOSED: color = "#54BEFC"; break;
    case STATUS_NAME_TO_ID.REJECTED: color = "#9C4FAB"; break;
    case STATUS_NAME_TO_ID.REJECTED_FROM_OPEN: color = "#9C4FAB"; break;
    case STATUS_NAME_TO_ID.AUTHORIZED: color = "#57911A"; break;
    case STATUS_NAME_TO_ID.CANCELLED: color = "#BF4438"; break;
    default: color = "#000000"
  }
  return (
    <div style={{
      backgroundColor: color
    }} className='w-2 h-2 rounded-full'></div>
  )
}

export default OrderColor