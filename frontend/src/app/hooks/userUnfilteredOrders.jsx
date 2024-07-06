"use client"

import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export default function useUnfilteredOrders() {
  const { unfilteredOrders, fetchOrders, alreadyFetchedOrders } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedOrders)
      fetchOrders()
  }, [])
  
  return unfilteredOrders
}
