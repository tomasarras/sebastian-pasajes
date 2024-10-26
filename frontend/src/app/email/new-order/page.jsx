import Container from '@/app/components/Container'
import StaticHeader from '@/app/components/header/StaticHeader'
import React from 'react'
import s from './new-order.module.css'

const EmailNewOrder = () => {
  return (
    <div className="bg-gray-75 min-h-screen min-w-screen">
      <StaticHeader className="absolute" />
      <div className="flex items-center justify-center">
        <div className="mt-20 bg-gray-75 p-4 md:p-16 w-full flex justify-center">
          <div className='container bg-white shadow rounded-lg w-full p-4 px-4 md:px-8'>
            <h1 className="font-medium text-center">Nueva Orden</h1>
            <div className='flex justify-center'>
              <img className={`${s.illustrationImg}`} src='https://i.imgur.com/gfYp7Q3.png' alt='ilustracion' />
            </div>
            <div className='mt-2'><p>La orden N°&lt;orderNumber&gt; del pasajero &lt;passengerFullName&gt;  ha sido generada por el cliente &lt;businessName&gt;</p></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmailNewOrder