"use client"
import React, { useState } from "react";
import ModifyOrder from "../../components/module/ModifyOrder";
import { useParams } from 'next/navigation'
import Loader from "@/app/components/loader/loader";
import useOrder from "@/app/hooks/useOrder";
import { useEffect } from "react";
import Container from "@/app/components/Container";

export default function ModificarOrden() {
  const params = useParams()
  const order = useOrder(params.id)
  const [localOrder, setOrder] = useState(null)

  useEffect(() => {
    setOrder(order)
  }, [order])  

  if (!localOrder) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return <Container>
    <ModifyOrder setOrder={setOrder} order={localOrder} readOnly={false} />
  </Container>
}