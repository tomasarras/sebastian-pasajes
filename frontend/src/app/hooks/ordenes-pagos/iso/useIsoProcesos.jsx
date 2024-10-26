"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoProcesos() {
  const { isoProcesos, fetchIsoProcesos, alreadyFetchedIsoProcesos } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoProcesos)
      fetchIsoProcesos()
  }, [])
  
  return isoProcesos
}
