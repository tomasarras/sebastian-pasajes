"use client"

import React, { useContext, useEffect, useState } from "react";
import { Context } from "../context/OPContext";

export default function useNews() {
  const { news, fetchNews, alreadyFetchedNews } = useContext(Context)

  useEffect(() => {
    if (!alreadyFetchedNews)
      fetchNews()
  }, [])
  
  return news
}
