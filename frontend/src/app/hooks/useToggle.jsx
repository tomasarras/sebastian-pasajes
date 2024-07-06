"use client"

import React, { useState } from "react";

export default function useToggle(initialValue = false) {
  const [isOn, setIsOn] = useState(initialValue)
  const toggle = () => setIsOn(!isOn)
  return [isOn, toggle]
}
