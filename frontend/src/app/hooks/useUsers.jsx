"use client"

import { useContext, useEffect } from "react";
import { Context } from "../context/Context";

export default function useUsers() {
  const { users, fetchUsers, alreadyFetchedUsers } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedUsers)
      fetchUsers()
  }, [])
  
  return users
}