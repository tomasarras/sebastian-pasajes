"use client"

import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export default function useGroups() {
  const { groups, fetchGroups, alreadyFetchedGroups } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedGroups)
      fetchGroups()
  }, [])
  
  return groups
}
