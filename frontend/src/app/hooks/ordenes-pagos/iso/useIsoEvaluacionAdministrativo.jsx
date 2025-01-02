"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoEvaluacionAdministrativo() {
  const { isoEvaluacionesAdministrativo, fetchIsoEvaluacionesAdministrativo, alreadyFetchedIsoEvaluacionesAdministrativo } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoEvaluacionesAdministrativo)
      fetchIsoEvaluacionesAdministrativo()
  }, [])
  
  return {isoEvaluacionesAdministrativo, fetchIsoEvaluacionesAdministrativo}
}
