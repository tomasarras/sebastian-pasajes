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
import { APP_VERSION } from "../utils/constants";

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

    const createOrder = async (order) => {
        const createdOrder = await ordersService.create(order)
        setUnfilteredOrders([...unfilteredOrders, createdOrder])
        return createdOrder
    }

    const fetchOrders = async (props) => {
        const orders = await ordersService.getOrders(props)
        setUnfilteredOrders(orders)
        setAlreadyFetchedOrders(true)
    }

    const updateOrder = async (orderId, order) => {
        const updatedOrder = await ordersService.editOrder(orderId, order)
        setUnfilteredOrders(unfilteredOrders.map(o => o.id === order.id ? updatedOrder : o))
        changeAlertStatusAndMessage(true, 'success', `Se ha actualizado la orden N°${updatedOrder.number}`);
        return updatedOrder;
    }

    const authorizeOrder = async (order) => {
        const updatedOrder = await ordersService.authorizeOrder(order.id)
        setUnfilteredOrders(unfilteredOrders.map(o => o.id === order.id ? updatedOrder : o))
        changeAlertStatusAndMessage(true, 'success', `Se ha autorizado la orden N°${order.number}`);
        return updatedOrder;
    }
    
    const rejectOrder = async (order) => {
        const updatedOrder = await ordersService.rejectOrder(order.id)
        setUnfilteredOrders(unfilteredOrders.map(o => o.id === order.id ? updatedOrder : o))
        changeAlertStatusAndMessage(true, 'success', `Se ha rechazado la orden N°${order.number}`);
        return updatedOrder;
    }
    
    const closeOrder = async (order) => {
        const updatedOrder = await ordersService.closeOrder(order.id)
        setUnfilteredOrders(unfilteredOrders.map(o => o.id === order.id ? updatedOrder : o))
        changeAlertStatusAndMessage(true, 'success', `Se ha cerrado la orden N°${order.number}`);
        return updatedOrder;
    }
    
    const cancelOrder = async (order) => {
        const updatedOrder = await ordersService.cancelOrder(order.id)
        setUnfilteredOrders(unfilteredOrders.map(o => o.id === order.id ? updatedOrder : o))
        changeAlertStatusAndMessage(true, 'success', `Se ha cancelado la orden N°${order.number}`);
        return updatedOrder;
    }
    
    const openOrder = async (order) => {
        const updatedOrder = await ordersService.openOrder(order.id)
        setUnfilteredOrders(unfilteredOrders.map(o => o.id === order.id ? updatedOrder : o))
        changeAlertStatusAndMessage(true, 'success', `Se ha abierto la orden N°${order.number}`);
        return updatedOrder;
    }
    
    const updateProvince = async (province) => {
        const updatedProvince = await provinceService.edit(province)
        setProvinces(provinces.map(p => p.id === province.id ? updatedProvince : p))
        changeAlertStatusAndMessage(true, 'success', `Se actualizo la provincia`);
        return updatedProvince;
    }
    
    const createProvince = async (province) => {
        const createdProvince = await provinceService.create(province)
        setProvinces([...provinces, createdProvince])
        changeAlertStatusAndMessage(true, 'success', `Provincia creada con exito`);
        return createdProvince;
    }
    
    const updateLocation = async (location) => {
        const updatedLocation = await locationService.edit(location)
        setLocations(locations.map(l => l.id === location.id ? updatedLocation : l))
        changeAlertStatusAndMessage(true, 'success', `Se actualizo la localidad`);
        return updatedLocation;
    }
    
    const createLocation = async (location) => {
        const createdLocation = await locationService.create(location)
        setLocations([...locations, createdLocation])
        changeAlertStatusAndMessage(true, 'success', `Localidad creada con exito`);
        return createdLocation;
    }
    
    const createGroup = async (groupName) => {
        const createdGroup = await groupService.create(groupName)
        setGroups([...groups, createdGroup])
        changeAlertStatusAndMessage(true, 'success', `Grupo creado con exito`);
        return createdGroup;
    }
    
    const editGroup = async (groupId, groupName) => {
        const updatedGroup = await groupService.editGroup(groupId, groupName)
        setGroups(groups.map(g => g.id === groupId ? updatedGroup : g))
        changeAlertStatusAndMessage(true, 'success', `Se actualizo el grupo`);
        return updatedGroup;
    }
    
    const deleteGroup = async (groupId) => {
        await groupService.deleteGroup(groupId)
        setGroups(groups.filter(g => g.id != groupId))
        changeAlertStatusAndMessage(true, 'success', `Se borro el grupo`);
    }
    
    const createClient = async (client) => {
        const createdClient = await clientService.createClient(client)
        setClients([...clients, createdClient])
        changeAlertStatusAndMessage(true, 'success', `Cliente creado con exito`);
        return createdClient;
    }
    
    const editClient = async (client) => {
        const updatedClient = await clientService.editClient(client)
        setClients(clients.map(c => c.id === updatedClient.id ? updatedClient : c))
        changeAlertStatusAndMessage(true, 'success', `Se actualizo el cliente`);
        return updatedClient;
    }
    
    const changeUserPassword = async (newPassword, user) => {
        return userService.changePasswordAsAdmin(newPassword, user.username)
    }

    useEffect(() => {
        console.log("APP RUNNING IN VERSION="+APP_VERSION);
        
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
            authorizeOrder,
            rejectOrder,
            closeOrder,
            cancelOrder,
            openOrder,
            createOrder,
            changeUserPassword,
            updateProvince,
            createProvince,
            updateLocation,
            createLocation,
            createGroup,
            editGroup,
            deleteGroup,
            createClient,
            editClient,
            updateOrder,
        }}>
            {children}
        </Context.Provider>
    );
}