"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoReporteGuardias() {
  const { isoReporteGuardias, fetchIsoReporteGuardias, alreadyFetchedIsoReporteGuardias } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoReporteGuardias)
      fetchIsoReporteGuardias()
  }, [])
  
  return isoReporteGuardias
}
