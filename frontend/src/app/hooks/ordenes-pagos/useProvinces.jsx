"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useProvinces() {
  const { provinces, fetchProvinces, alreadyFetchedProvinces } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedProvinces)
      fetchProvinces()
  }, [])
  
  return provinces
}
