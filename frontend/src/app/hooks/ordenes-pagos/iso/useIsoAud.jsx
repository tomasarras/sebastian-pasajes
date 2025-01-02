"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoAud() {
  const { isoAud, fetchIsoAud, alreadyFetchedIsoAud } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoAud)
      fetchIsoAud()
  }, [])
  
  return { isoAud, fetchIsoAud }
}
