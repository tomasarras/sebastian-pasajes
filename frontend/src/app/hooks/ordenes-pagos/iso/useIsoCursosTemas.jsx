"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoCursosTemas() {
  const { isoCursoTemas, fetchIsoCursoTemas, alreadyFetchedIsoCursoTemas } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoCursoTemas)
      fetchIsoCursoTemas()
  }, [])
  
  return isoCursoTemas
}
