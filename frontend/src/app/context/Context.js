import React, { createContext, useEffect } from "react";
import { useState } from "react";
import * as clientService from '../services/clientService'
import * as companyService from '../services/companyService'
import * as locationService from '../services/locationService'
import * as groupService from '../services/groupService'
import * as provinceService from '../services/provinceService'
import * as userService from '../services/userService'
import * as ordersService from '../services/ordersService'
import { useRouter, usePathname } from "next/navigation";

export const Context = createContext();

export const Provider = ({ children }) => {
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');
    const [clients, setClients] = useState([])
    const [unfilteredOrders, setUnfilteredOrders] = useState([])
    const [users, setUsers] = useState([]);
    const [provinces, setProvinces] = useState([])
    const [locations, setLocations] = useState([])
    const [groups, setGroups] = useState([])
    const [alreadyFetchedClients, setAlreadyFetchedClients] = useState(false)
    const [alreadyFetchedOrders, setAlreadyFetchedOrders] = useState(false)
    const [alreadyFetchedProvinces, setAlreadyFetchedProvinces] = useState(false)
    const [alreadyFetchedLocations, setAlreadyFetchedLocations] = useState(false)
    const [alreadyFetchedGroups, setAlreadyFetchedGroups] = useState(false)
    const [alreadyFetchedUsers, setAlreadyFetchedUsers] = useState(false)
    const [company, setCompany] = useState(null)
    const [welcomeMessage, setWelcomeMessage] = useState('')
    const pathname = usePathname()

    const changeAlertStatusAndMessage = (activeAlert, status, message) => {
        setAlertMessage(message);
        setIsAlertActive(activeAlert);
        setAlertStatus(status);
    }

    const getCompany = async () => {
        if (company == null) {
            const c = await companyService.get()
            setCompany(c)
            return c
        }
        return company
    }

    const getWelcomeMessage = async () => {
        if (welcomeMessage == null) {
            const w = await companyService.getWelcome()
            setWelcomeMessage(w)
            return w
        }
        return welcomeMessage
    }

    const fetchClients = async (options) => {
        const clients = await clientService.getAllClients(options)
        if (options == undefined)
            setClients(clients)
        setAlreadyFetchedClients(true)
        return clients
    }

    const fetchProvinces = async () => {
        const provinces = await provinceService.getAll()
        setProvinces(provinces)
        setAlreadyFetchedProvinces(true)
    }

    const fetchLocations = async () => {
        const locations = await locationService.getAllLocations()
        setLocations(locations)
        setAlreadyFetchedLocations(true)
    }

    const fetchGroups = async () => {
        const groups = await groupService.getAllGroups()
        setGroups(groups)
        setAlreadyFetchedGroups(true)
    }

    const fetchUsers = async () => {
        const usrs = await userService.getUsers()
        setUsers(usrs);
        setAlreadyFetchedUsers(true)
    }

    const getOrderById = async (id) => {
        return await ordersService.getOrder(id);
    }

    const fetchOrders = async (props) => {
        const orders = await ordersService.getOrders(props)
        setUnfilteredOrders(orders)
        setAlreadyFetchedOrders(true)
    }

    useEffect(() => {
        if (pathname == "/empresa") {
            getCompany()
        }
        if (pathname == "/login") {
            getWelcomeMessage()
        }
    }, [pathname])


    return (
        <Context.Provider value={{
            getOrderById,
            alreadyFetchedUsers,
            changeAlertStatusAndMessage,
            isAlertActive,
            alertMessage,
            alertStatus,
            clients,
            alreadyFetchedClients,
            fetchClients,
            company,
            welcomeMessage,
            groups,
            fetchGroups,
            alreadyFetchedGroups,
            fetchUsers,
            users,
            locations,
            fetchLocations,
            alreadyFetchedLocations,
            provinces,
            fetchProvinces,
            alreadyFetchedProvinces,
            unfilteredOrders,
            fetchOrders,
            alreadyFetchedOrders,
        }}>
            {children}
        </Context.Provider>
    );
}