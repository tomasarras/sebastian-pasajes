"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect, useState } from "react";
import useProvinces from "./useProvinces";

export default function usePuestos() {
  const { puestos, fetchPuestos, alreadyFetchedPuestos } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedPuestos)
      fetchPuestos()
  }, [])
  
  return puestos
}
