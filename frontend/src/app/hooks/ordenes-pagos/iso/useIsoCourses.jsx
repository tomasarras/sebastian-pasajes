"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useIsoCourses() {
  const { isoCourses, fetchIsoCourses, alreadyFetchedIsoCourses } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedIsoCourses)
      fetchIsoCourses()
  }, [])
  
  return isoCourses
}
