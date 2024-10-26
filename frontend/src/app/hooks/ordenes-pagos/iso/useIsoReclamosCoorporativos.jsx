"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoReclamosCoorporativos() {
  const { isoReclamosCoorporativos, fetchIsoReclamosCoorporativos, alreadyFetchedIsoReclamosCoorporativos } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoReclamosCoorporativos)
      fetchIsoReclamosCoorporativos()
  }, [])
  
  return isoReclamosCoorporativos
}
