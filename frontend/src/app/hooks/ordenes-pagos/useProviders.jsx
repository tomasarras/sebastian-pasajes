"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useProviders() {
  const { providers, fetchProviders, alreadyFetchedProviders } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedProviders)
      fetchProviders()
  }, [])
  
  return providers
}
