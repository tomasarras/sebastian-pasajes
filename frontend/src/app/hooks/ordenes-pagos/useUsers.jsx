"use client"

import { Context } from "@/app/context/OPContext";
import { useContext, useEffect } from "react";

export default function useUsers() {
  const { users, fetchUsers, alreadyFetchedUsers } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedUsers)
      fetchUsers()
  }, [])
  
  return users
}
