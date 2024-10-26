"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoNcs() {
  const { isoNcs, fetchIsoNcs, alreadyFetchedIsoNcs } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoNcs)
      fetchIsoNcs()
  }, [])
  
  return isoNcs
}
