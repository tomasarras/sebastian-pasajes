"use client";
import { useState, useEffect } from 'react';
import './globals.css'
import { useRouter, usePathname } from 'next/navigation'
import { Inter } from 'next/font/google';
import 'dayjs/locale/es';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import SnackBar from "./components/snackBar";
import { Provider } from "./context/Context";
import Layout from './components/layout';
import OPLayout from './components/opLayout';
import OPSnackBar from './components/opSnackBar';
const inter = Inter({ subsets: ['latin'],   weight: ['300', '400', '500', '600', '700'], });

export default function RootLayout({ children }) {

  const pathname = usePathname();
  const pathnameIncludesLayout = !['/login', '/email/new-order', '/ordenes-pagos/login'].includes(pathname)

  const getTitle = () => {
    if (pathname.startsWith('/ordenes-pagos')) {
      return "Órdenes y Pagos";
    } else if (pathname === '/login') {
      return "Iniciar Sesión";
    } else if (pathname === '/') {
      return "Sebastián viajes";
    }
    return "Sebastián viajes";
  };

  return (
    <html lang="en">
      <head>
        <title>{getTitle()}</title>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon-57x57.png"></link>
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon-60x60.png"></link>
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-icon-72x72.png"></link>
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon-76x76.png"></link>
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-icon-114x114.png"></link>
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-icon-120x120.png"></link>
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-icon-144x144.png"></link>
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-icon-152x152.png"></link>
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-icon-180x180.png"></link>
        <link rel="icon" type="image/png" sizes="192x192"  href="/android-icon-192x192.png"></link>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
        <link rel="icon" type="image/png" sizes="96x96" href="/favicon-96x96.png"></link>
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png"></link>
        <link rel="manifest" href="/manifest.json"></link>
        <meta name="msapplication-TileColor" content="#000000"></meta>
        <meta name="msapplication-TileImage" content="/ms-icon-144x144.png"></meta>
        <meta name="theme-color" content="#000000"></meta>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      </head>
      <Provider>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es">
          <body className={inter.className}>
            {pathname.startsWith("/ordenes-pagos") 
            ? <></>
            : <span className="absolute right-0 top-0"><SnackBar /></span>}
            {!pathnameIncludesLayout ? (
                <main>{children}</main>
            )
            :
            <main>
              {pathname.startsWith("/ordenes-pagos") ? 
              <OPLayout>
              {children}
            </OPLayout>
            :
              <Layout>
                {children}
              </Layout>
              }
            </main>
            }
          </body>
        </LocalizationProvider>
      </Provider>
    </html>
  )
}
