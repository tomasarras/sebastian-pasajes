"use client"

import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export default function useClients() {
  const { clients, fetchClients, alreadyFetchedClients } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedClients)
      fetchClients()
  }, [])
  
  return clients
}
