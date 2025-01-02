"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect, useState } from "react";
import useProvinces from "./useProvinces";

export default function useLocations() {
  const provinces = useProvinces()
  const [localities, setLocalities] = useState([])

  useEffect(() => {
    let localities = []
    provinces.forEach(province => localities = [...localities, ...province.localidades])
    setLocalities(localities)
  }, [provinces])
  
  return localities
}
