"use client"

import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export default function useProvinces() {
  const { provinces, fetchProvinces, alreadyFetchedProvinces } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedProvinces)
      fetchProvinces()
  }, [])
  
  return provinces
}
