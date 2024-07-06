"use client"

import React, { useEffect, useState } from "react";
import { PROFILES_VALUES } from "../utils/utils";
import { useRouter } from "next/navigation";

export default function useAuth() {
  const [userData, setUserData] = useState(null)
  const router = useRouter();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userInfo'))
    if (!userData) {
      router.push('/login')
      return
    }
    const [_, role] = userData.role.split("ROLE_")
    userData.isAdmin = role == PROFILES_VALUES.ADMIN
    userData.isAgent = role == PROFILES_VALUES.AGENT
    userData.isApplicant = role == PROFILES_VALUES.APPLICANT
    userData.isAuditor = role == PROFILES_VALUES.AUDITOR
    userData.isAuthorizer = role == PROFILES_VALUES.AUTHORIZER
    setUserData(userData)
  }, [])
  
  return userData
}
