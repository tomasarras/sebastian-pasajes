"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoEncuestasIssn() {
  const { isoEncuestasIssn, fetchIsoEncuestasIssn, alreadyFetchedIsoEncuestasIssn } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoEncuestasIssn)
      fetchIsoEncuestasIssn()
  }, [])
  
  return isoEncuestasIssn
}
