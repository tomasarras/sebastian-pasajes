"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoEncuestasCor() {
  const { isoEncuestasCor, fetchIsoEncuestasCor, alreadyFetchedIsoEncuestasCor } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoEncuestasCor)
      fetchIsoEncuestasCor()
  }, [])
  
  return {isoEncuestasCor, fetchIsoEncuestasCor}
}
