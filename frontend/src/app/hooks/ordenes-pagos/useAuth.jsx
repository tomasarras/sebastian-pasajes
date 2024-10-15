"use client"

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from 'next/navigation'

export default function useAuth() {
  const [userData, setUserData] = useState(null)
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('opUserInfo'))
    if (pathname === "/ordenes-pagos") {
      router.push('/ordenes-pagos/login')
      return
    } else if (pathname === "/ordenes-pagos/login") {
      return
    }
    if (!userData) {
      router.push('/ordenes-pagos/login')
      return
    }
    setUserData(userData)
  }, [])
  
  return userData
}
