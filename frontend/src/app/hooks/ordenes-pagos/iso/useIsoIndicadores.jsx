"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoIndicadores() {
  const { isoIndicadores, fetchIsoIndicadores, alreadyFetchedIsoIndicadores } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoIndicadores)
      fetchIsoIndicadores()
  }, [])
  
  return {isoIndicadores, fetchIsoIndicadores}
}
