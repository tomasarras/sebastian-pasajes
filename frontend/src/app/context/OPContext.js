import React, { createContext, useEffect } from "react";
import { useState } from "react";
import * as clientService from '../services/clientService'
import * as companyService from '../services/companyService'
import * as locationService from '../services/locationService'
import * as groupService from '../services/groupService'
import * as provinceService from '../services/provinceService'
import * as ordersService from '../services/ordersService'
import * as service from '../services/ordenes-pagos/service'
import { useRouter, usePathname } from "next/navigation";

export const Context = createContext();

export const OPProvider = ({ children }) => {
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');
    const [news, setNews] = useState([])
    const [alreadyFetchedNews, setAlreadyFetchedNews] = useState(false)
    const [unfilteredOrders, setUnfilteredOrders] = useState([])
    const [provinces, setProvinces] = useState([])
    const [locations, setLocations] = useState([])
    const [groups, setGroups] = useState([])
    const [alreadyFetchedClients, setAlreadyFetchedClients] = useState(false)
    const [alreadyFetchedProvinces, setAlreadyFetchedProvinces] = useState(false)
    const [alreadyFetchedLocations, setAlreadyFetchedLocations] = useState(false)
    const [alreadyFetchedGroups, setAlreadyFetchedGroups] = useState(false)
    const [company, setCompany] = useState(null)
    const [welcomeMessage, setWelcomeMessage] = useState('')
    const [t, set] = useState('')
    const pathname = usePathname()

    const fetchNews = async () => {
        const news = await service.getNews()
        setNews(news)
        setAlreadyFetchedNews(true)
    }

    

    useEffect(() => {
        // if (pathname == "/empresa") {
        //     getCompany()
        // }
        // if (pathname == "/login") {
        //     getWelcomeMessage()
        // }
    }, [pathname])


    return (
        <Context.Provider value={{
            news,
            alreadyFetchedNews,
            fetchNews,
        }}>
            {children}
        </Context.Provider>
    );
}