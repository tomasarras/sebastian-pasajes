"use client"
import React from "react";
import ModifyOrder from "../../components/module/ModifyOrder";
import { useParams } from 'next/navigation'
import Loader from "@/app/components/loader/loader";
import useOrder from "@/app/hooks/useOrder";

export default function ModificarOrden() {
  const params = useParams()
  const order = useOrder(params.id)

  if (!order) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return <ModifyOrder order={order} readOnly={false} />
}