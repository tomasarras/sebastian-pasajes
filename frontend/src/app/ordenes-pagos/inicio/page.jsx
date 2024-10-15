"use client"
import React, { useContext, useState } from "react";
import useNews from "@/app/hooks/useNews.jsx";
import { useEffect } from "react";
import InfoAlert from "@/app/components/alerts/infoAlert.jsx";
import DangerAlert from "@/app/components/alerts/dangerAlert.jsx";
import Container from "@/app/components/Container";

export default function OrdenesPagosHome() {
  const news = useNews()
  const defaultNews = [{
    title: "Bienvenidos a la Intranet de Sebastián & Co",
    subtitle: "Viajes y Turismo",
    text: "Somos una empresa de genuinos capitales neuquinos en constante actividad desde el año 1994, acompañando el crecimiento de Neuqén y el Alto Valle mediante la provisión de servicios a particulares y corporaciones, enfocando el negocio desde el punto de vista del cliente.",
    isUrgent: false
  }]
  const [localNews, setLocalNews] = useState(defaultNews)

  useEffect(() => {
    setLocalNews(news.length == 0 ? defaultNews : news)
  }, [news])
  

  return (
    <Container>
      <div className="shadow rounded-lg bg-white p-2 md:p-4">
        <div className="flex flex-col gap-4">
          {localNews.map(neww => neww.isUrgent ? <DangerAlert key={neww.title} {...neww}/> : <InfoAlert key={neww.title} {...neww} />)}
        </div>
      </div>
    </Container>
  )
}
