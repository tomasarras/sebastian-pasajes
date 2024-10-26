"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoTipoDocumentos() {
  const { isoTipoDocumentos, fetchIsoTipoDocumentos, alreadyFetchedIsoTipoDocumentos } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoTipoDocumentos)
      fetchIsoTipoDocumentos()
  }, [])
  
  return isoTipoDocumentos
}
