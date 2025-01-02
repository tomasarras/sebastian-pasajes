"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect, useState } from "react";
import * as isoDocumentosService from '../../../services/ordenes-pagos/iso/isoDocumentosService'

export default function useIsoDocEstados() {
  const [estados, setEstados] = useState([])

  const fetchEstados = async () => {
    const estados = await isoDocumentosService.getAllDocumentosEstados()
    setEstados(estados)
  }

  useEffect(() => {
    fetchEstados()
  }, [])
  
  return estados
}
