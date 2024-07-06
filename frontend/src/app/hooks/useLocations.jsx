"use client"

import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export default function useLocations() {
  const { locations, fetchLocations, alreadyFetchedLocations } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedLocations)
      fetchLocations()
  }, [])
  
  return locations
}
