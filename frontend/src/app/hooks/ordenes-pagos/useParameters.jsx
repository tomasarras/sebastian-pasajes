"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useParameters() {
  const { parameters, fetchParameters, alreadyFetchedParameters } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedParameters)
      fetchParameters()
  }, [])
  
  return parameters
}
