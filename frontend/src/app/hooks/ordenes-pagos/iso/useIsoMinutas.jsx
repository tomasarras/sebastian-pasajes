"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoMinutas() {
  const { isoMinutas, fetchIsoMinutas, alreadyFetchedIsoMinutas } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoMinutas)
      fetchIsoMinutas()
  }, [])
  
  return isoMinutas
}
