"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoCriterios() {
  const { isoCriterios, fetchIsoCriterios, alreadyFetchedIsoCriterios } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoCriterios)
      fetchIsoCriterios()
  }, [])
  
  return isoCriterios
}
