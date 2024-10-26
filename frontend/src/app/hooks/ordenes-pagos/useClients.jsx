"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useClients() {
  const { clients, fetchClients, alreadyFetchedClients } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedClients)
      fetchClients()
  }, [])
  
  return clients
}
