"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useActivities() {
  const { activities, fetchActivities, alreadyFetchedActivities } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedActivities)
      fetchActivities()
  }, [])
  
  return activities
}
