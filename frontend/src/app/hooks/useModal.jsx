"use client"

import React, { useState } from "react";

export default function useModal() {
  const [isOpen, setIsOpen] = useState(false)
  const close = () => setIsOpen(!isOpen)
  const open = () => setIsOpen(true)
  return { isOpen, close, open }
}
