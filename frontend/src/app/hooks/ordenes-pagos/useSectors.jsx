"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useSectors() {
  const { sectors, fetchSectors, alreadyFetchedSectors } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedSectors)
      fetchSectors()
  }, [])
  
  return sectors
}
