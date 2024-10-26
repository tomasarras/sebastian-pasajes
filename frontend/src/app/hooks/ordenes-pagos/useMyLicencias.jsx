"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useMyLicencias() {
  const { myLicencias, fetchMyLicencias, alreadyFetchedMyLicencias } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedMyLicencias)
      fetchMyLicencias()
  }, [])
  
  return myLicencias
}
