"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoEvaluacionEjecutivoVentasCoorporativo() {
  const { isoEvaluacionesVentasCoorporativo, fetchIsoEvaluacionesVentasCoorporativo, alreadyFetchedIsoEvaluacionesVentasCoorporativo } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoEvaluacionesVentasCoorporativo)
      fetchIsoEvaluacionesVentasCoorporativo()
  }, [])
  
  return isoEvaluacionesVentasCoorporativo
}
