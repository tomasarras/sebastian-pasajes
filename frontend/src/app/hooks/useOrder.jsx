"use client"

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";

export default function useOrder(id) {
  const { getOrderById } = useContext(Context)
  const [order, setOrder] = useState(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await getOrderById(id)
        setOrder(orderData)
      } catch (error) {
        console.error('Error al obtener la orden:', error)
      }
    }

    fetchOrder()
  }, [id])

  return order
}