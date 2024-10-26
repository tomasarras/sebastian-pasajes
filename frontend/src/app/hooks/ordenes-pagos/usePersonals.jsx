"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function usePersonals() {
  const { personals, fetchPersonals, alreadyFetchedPersonals } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedPersonals)
      fetchPersonals()
  }, [])
  
  return personals
}
