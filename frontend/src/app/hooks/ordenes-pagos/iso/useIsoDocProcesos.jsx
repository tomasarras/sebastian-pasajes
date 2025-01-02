"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect, useState } from "react";
import * as isoDocumentosService from '../../../services/ordenes-pagos/iso/isoDocumentosService'

export default function useIsoDocProcesos() {
  const [procesos, setProcesos] = useState([])

  const fetchProcesos = async () => {
    const procesos = await isoDocumentosService.getAllDocumentosProcesos()
    setProcesos(procesos)
  }

  useEffect(() => {
    fetchProcesos()
  }, [])
  
  return procesos
} 