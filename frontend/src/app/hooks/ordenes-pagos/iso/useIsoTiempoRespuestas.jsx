"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoTiempoRespuestas() {
  const { isoTiempoRespuestas, fetchIsoTiempoRespuestas, alreadyFetchedIsoTiempoRespuestas } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoTiempoRespuestas)
      fetchIsoTiempoRespuestas()
  }, [])
  
  return isoTiempoRespuestas
}
