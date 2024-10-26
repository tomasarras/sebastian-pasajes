"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function usePasajes() {
  const { pasajes, fetchPasajes, alreadyFetchedPasajes } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedPasajes)
      fetchPasajes()
  }, [])
  
  return pasajes
}
