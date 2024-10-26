"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoReclamosTurismo() {
  const { isoReclamosTurismo, fetchIsoReclamosTurismo, alreadyFetchedIsoReclamosTurismo } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoReclamosTurismo)
      fetchIsoReclamosTurismo()
  }, [])
  
  return isoReclamosTurismo
}
