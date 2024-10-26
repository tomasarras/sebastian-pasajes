"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoEncuestasTur() {
  const { isoEncuestasTur, fetchIsoEncuestasTur, alreadyFetchedIsoEncuestasTur } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoEncuestasTur)
      fetchIsoEncuestasTur()
  }, [])
  
  return isoEncuestasTur
}
