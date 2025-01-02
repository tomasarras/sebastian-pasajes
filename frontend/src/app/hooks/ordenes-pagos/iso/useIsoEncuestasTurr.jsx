"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoEncuestasTurr() {
  const { isoEncuestasTurr, fetchIsoEncuestasTurr, alreadyFetchedIsoEncuestasTurr } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoEncuestasTurr)
      fetchIsoEncuestasTurr()
  }, [])
  
  return { isoEncuestasTurr, fetchIsoEncuestasTurr }
}
