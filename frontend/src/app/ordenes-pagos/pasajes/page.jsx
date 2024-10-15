"use client"
import CommonInput from "@/app/components/commonInput";
import React, { useState } from "react";
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useRouter } from 'next/navigation'
import * as userService from '../../services/ordenes-pagos/userService.js'
import Header from "@/app/components/ordenes-pago/header/header.jsx";
import Image from "next/image.js";
import illustration from "../../../../public/travel-illustration-primary.png"
import PrimaryButton from "@/app/components/buttons/primaryButton.jsx";

export default function OrdenesPagoPasajes() {

  return (
  <div className="bg-gray-75">
    pasajes
  </div>
  )
}
