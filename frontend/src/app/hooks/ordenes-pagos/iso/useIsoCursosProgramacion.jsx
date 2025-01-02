"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoCursosProgramacion() {
  const { isoCursoProgramacion, fetchIsoCursoProgramacion, alreadyFetchedIsoCursoProgramacion } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoCursoProgramacion)
      fetchIsoCursoProgramacion()
  }, [])
  
  return { isoCursoProgramacion, fetchIsoCursoProgramacion }
}
