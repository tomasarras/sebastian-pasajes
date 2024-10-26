"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useOrders() {
  const { orders, fetchOrders, alreadyFetchedOrders } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedOrders)
      fetchOrders()
  }, [])
  
  return orders
}
