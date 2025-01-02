"use client"

import { Context } from "@/app/context/OPContext";
import { ISO_NC_STATUS_IDS } from "@/app/utils/constants";
import { useContext, useEffect } from "react";

export default function useIsoNcs() {
  const { isoNcs, fetchIsoNcs, alreadyFetchedIsoNcs } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoNcs)
      fetchIsoNcs({
        IdEstado: ISO_NC_STATUS_IDS.OPEN
      })
  }, [])
  
  return { isoNcs, fetchIsoNcs }
}
