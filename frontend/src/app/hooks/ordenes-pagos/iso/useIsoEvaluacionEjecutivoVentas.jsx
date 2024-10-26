"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoEvaluacionEjecutivoVentas() {
  const { isoEvaluacionesVentas, fetchIsoEvaluacionesVentas, alreadyFetchedIsoEvaluacionesVentas } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoEvaluacionesVentas)
      fetchIsoEvaluacionesVentas()
  }, [])
  
  return isoEvaluacionesVentas
}
