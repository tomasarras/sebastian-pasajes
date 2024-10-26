"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoFormadores() {
  const { isoFormadores, fetchIsoFormadores, alreadyFetchedIsoFormadores } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoFormadores)
      fetchIsoFormadores()
  }, [])
  
  return isoFormadores
}
