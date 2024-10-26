"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoOrigenes() {
  const { isoOrigenes, fetchIsoOrigenes, alreadyFetchedIsoOrigenes } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoOrigenes)
      fetchIsoOrigenes()
  }, [])
  
  return isoOrigenes
}
