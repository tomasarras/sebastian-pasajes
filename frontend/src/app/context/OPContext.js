import React, { createContext, useEffect } from "react";
import { useState } from "react";
import * as newService from '../services/ordenes-pagos/newService'
import * as companyService from '../services/companyService'
import * as locationService from '../services/locationService'
import * as groupService from '../services/groupService'
import * as provinceService from '../services/provinceService'
import * as ordersService from '../services/ordenes-pagos/ordersService'
import * as personalsService from '../services/ordenes-pagos/personalsService.js'
import * as provincesService from '../services/ordenes-pagos/provincesService.js'
import * as sectorsService from '../services/ordenes-pagos/sectorsService.js'
import * as activitiesService from '../services/ordenes-pagos/activitiesService.js'
import * as userService from '../services/ordenes-pagos/userService.js'
import * as isoAudService from '../services/ordenes-pagos/iso/isoAudService'
import * as isoCoursesService from '../services/ordenes-pagos/iso/isoCoursesService'
import * as isoEncuestasService from '../services/ordenes-pagos/iso/isoEncuestasService'
import * as isoEvaluacionesService from '../services/ordenes-pagos/iso/isoEvaluacionesService'
import * as isoMinutasService from '../services/ordenes-pagos/iso/isoMinutasService'
import * as isoNcsService from '../services/ordenes-pagos/iso/isoNcsService'
import * as isoReclamosService from '../services/ordenes-pagos/iso/isoReclamosService'
import * as isoReporteGuardiasService from '../services/ordenes-pagos/iso/isoReporteGuardiasService'
import * as isoTablasService from '../services/ordenes-pagos/iso/isoTablasService'
import * as isoTiempoRespuestaService from '../services/ordenes-pagos/iso/isoTiempoRespuestaService'
import * as isoIndicadoresService from '../services/ordenes-pagos/iso/isoIndicadoresService'
import * as providersService from '../services/ordenes-pagos/providersService'
import * as pasajesService from '../services/ordenes-pagos/pasajesService'
import * as service from '../services/ordenes-pagos/service'
import * as clientsService from '../services/ordenes-pagos/clientsService'
import * as parametersService from '../services/ordenes-pagos/parametersService'
import { useRouter, usePathname } from "next/navigation";
import { APP_VERSION } from "../utils/constants";

export const Context = createContext();

export const OPProvider = ({ children }) => {
    const [isAlertActive, setIsAlertActive] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');
    const [news, setNews] = useState([])
    const [parameters, setParameters] = useState(null)
    const [alreadyFetchedNews, setAlreadyFetchedNews] = useState(false)
    const [alreadyFetchedParameters, setAlreadyFetchedParameters] = useState(false)
    const [alreadyFetchedOrders, setAlreadyFetchedOrders] = useState(false)
    const [alreadyFetchedProviders, setAlreadyFetchedProviders] = useState(false)
    const [alreadyFetchedPersonals, setAlreadyFetchedPersonals] = useState(false)
    const [alreadyFetchedClients, setAlreadyFetchedClients] = useState(false)
    const [alreadyFetchedUsers, setAlreadyFetchedUsers] = useState(false)
    const [alreadyFetchedProvinces, setAlreadyFetchedProvinces] = useState(false)
    const [alreadyFetchedActivities, setAlreadyFetchedActivities] = useState(false)
    const [alreadyFetchedSectors, setAlreadyFetchedSectors] = useState(false)
    const [alreadyFetchedIsoNcs, setAlreadyFetchedIsoNcs] = useState(false)
    const [alreadyFetchedIsoAud, setAlreadyFetchedIsoAud] = useState(false)
    const [alreadyFetchedIsoCourses, setAlreadyFetchedIsoCourses] = useState(false)
    const [alreadyFetchedIsoEncuestasCor, setAlreadyFetchedIsoEncuestasCor] = useState(false)
    const [alreadyFetchedIsoEncuestasIssn, setAlreadyFetchedIsoEncuestasIssn] = useState(false)
    const [alreadyFetchedIsoEncuestasTur, setAlreadyFetchedIsoEncuestasTur] = useState(false)
    const [alreadyFetchedIsoEncuestasTurr, setAlreadyFetchedIsoEncuestasTurr] = useState(false)
    const [alreadyFetchedIsoMinutas, setAlreadyFetchedIsoMinutas] = useState(false)
    const [alreadyFetchedIsoReclamosCoorporativos, setAlreadyFetchedIsoReclamosCoorporativos] = useState(false)
    const [alreadyFetchedIsoReclamosTurismo, setAlreadyFetchedIsoReclamosTurismo] = useState(false)
    const [alreadyFetchedIsoReporteGuardias, setAlreadyFetchedIsoReporteGuardias] = useState(false)
    const [alreadyFetchedIsoCriterios, setAlreadyFetchedIsoCriterios] = useState(false)
    const [alreadyFetchedIsoFormadores, setAlreadyFetchedIsoFormadores] = useState(false)
    const [alreadyFetchedIsoOrigenes, setAlreadyFetchedIsoOrigenes] = useState(false)
    const [alreadyFetchedIsoProcesos, setAlreadyFetchedIsoProcesos] = useState(false)
    const [alreadyFetchedIsoTipoDocumentos, setAlreadyFetchedIsoTipoDocumentos] = useState(false)
    const [alreadyFetchedIsoCursoTemas, setAlreadyFetchedIsoCursoTemas] = useState(false)
    const [alreadyFetchedIsoCursoProgramacion, setAlreadyFetchedIsoCursoProgramacion] = useState(false)
    const [alreadyFetchedIsoTiempoRespuestas, setAlreadyFetchedIsoTiempoRespuestas] = useState(false)
    const [alreadyFetchedIsoEvaluacionesVentas, setAlreadyFetchedIsoEvaluacionesVentas] = useState(false)
    const [alreadyFetchedIsoEvaluacionesVentasCoorporativo, setAlreadyFetchedIsoEvaluacionesVentasCoorporativo] = useState(false)
    const [alreadyFetchedIsoEvaluacionesAdministrativo, setAlreadyFetchedIsoEvaluacionesAdministrativo] = useState(false)
    const [alreadyFetchedIsoIndicadores, setAlreadyFetchedIsoIndicadores] = useState(false)
    const [alreadyFetchedMyLicencias, setAlreadyFetchedMyLicencias] = useState(false)
    const [alreadyFetchedPasajes, setAlreadyFetchedPasajes] = useState(false)
    const [alreadyFetchedPuestos, setAlreadyFetchedPuestos] = useState(false)
    const [myLicencias, setMyLicencias] = useState([])
    const [pasajes, setPasajes] = useState([])
    const [puestos, setPuestos] = useState([])
    const [sectors, setSectors] = useState([])
    const [clients, setClients] = useState([])
    const [users, setUsers] = useState([])
    const [isoIndicadores, setIsoIndicadores] = useState([])
    const [isoEvaluacionesVentas, setIsoEvaluacionesVentas] = useState([])
    const [isoEvaluacionesVentasCoorporativo, setIsoEvaluacionesVentasCoorporativo] = useState([])
    const [isoEvaluacionesAdministrativo, setIsoEvaluacionesAdministrativo] = useState([])
    const [isoNcs, setIsoNcs] = useState([]) 
    const [isoAud, setIsoAud] = useState([]) 
    const [isoCourses, setIsoCourses] = useState([]) 
    const [isoEncuestasCor, setIsoEncuestasCor] = useState([]) 
    const [isoEncuestasIssn, setIsoEncuestasIssn] = useState([]) 
    const [isoEncuestasTur, setIsoEncuestasTur] = useState([]) 
    const [isoEncuestasTurr, setIsoEncuestasTurr] = useState([]) 
    const [isoMinutas, setIsoMinutas] = useState([]) 
    const [isoReclamosCoorporativos, setIsoReclamosCoorporativos] = useState([]) 
    const [isoReclamosTurismo, setIsoReclamosTurismo] = useState([]) 
    const [isoReporteGuardias, setIsoReporteGuardias] = useState([]) 
    const [isoCriterios, setIsoCriterios] = useState([]) 
    const [isoFormadores, setIsoFormadores] = useState([]) 
    const [isoOrigenes, setIsoOrigenes] = useState([]) 
    const [isoProcesos, setIsoProcesos] = useState([]) 
    const [isoTipoDocumentos, setIsoTipoDocumentos] = useState([]) 
    const [isoCursoTemas, setIsoCursoTemas] = useState([]) 
    const [isoCursoProgramacion, setIsoCursoProgramacion] = useState([]) 
    const [isoTiempoRespuestas, setIsoTiempoRespuestas] = useState([]) 
    const [orders, setOrders] = useState([])
    const [providers, setProviders] = useState([])
    const [personals, setPersonals] = useState([])
    const [provinces, setProvinces] = useState([])
    const [activities, setActivities] = useState([])
    const pathname = usePathname()

    const changeAlertStatusAndMessage = (activeAlert, status, message) => {
        setAlertMessage(message);
        setIsAlertActive(activeAlert);
        setAlertStatus(status);
    }

    const fetchPasajes = async (params) => {
        const pasajes = await pasajesService.getAll()
        setPasajes(pasajes)
        setAlreadyFetchedPasajes(true)
    }

    const fetchPuestos = async () => {
        const puestos = await personalsService.getAllPuestos()
        setPuestos(puestos)
        setAlreadyFetchedPuestos(true)
    }

    const fetchParameters = async () => {
        const parameters = await parametersService.getParameters()
        setParameters(parameters)
        setAlreadyFetchedParameters(true)
    }

    const updateParameters = async (newParameters) => {
        const parameters = await parametersService.updateParameters(newParameters)
        setParameters(parameters)
        changeAlertStatusAndMessage(true, 'success', 'Datos de la empresa actualizados!');
    }

    const fetchMyLicencias = async () => {
        const myLicencias = await personalsService.getMyLicencias()
        setMyLicencias(myLicencias)
        setAlreadyFetchedMyLicencias(true)
    }

    const fetchIsoAud = async (params) => {
        const isoAud = await isoAudService.getAll()
        setIsoAud(isoAud)
        setAlreadyFetchedIsoAud(true)
    }
    
    const fetchIsoEvaluacionesVentas = async (params) => {
        const isoEvaluacionesVentas = await isoEvaluacionesService.getAllEvaluationEjecutivoVentas()
        setIsoEvaluacionesVentas(isoEvaluacionesVentas)
        setAlreadyFetchedIsoEvaluacionesVentas(true)
    }
        
    const fetchIsoEvaluacionesVentasCoorporativo = async (params) => {
        const isoEvaluacionesVentasCoorporativo = await isoEvaluacionesService.getAllEvaluationEjecutivoVentasCoorporativo()
        setIsoEvaluacionesVentasCoorporativo(isoEvaluacionesVentasCoorporativo)
        setAlreadyFetchedIsoEvaluacionesVentasCoorporativo(true)
    }

    const fetchIsoEvaluacionesAdministrativo = async (params) => {
        const isoEvaluacionesAdministrativo = await isoEvaluacionesService.getAllEvaluationAdministrativo()
        setIsoEvaluacionesAdministrativo(isoEvaluacionesAdministrativo)
        setAlreadyFetchedIsoEvaluacionesAdministrativo(true)
    }

    const fetchIsoIndicadores = async (params) => {
        const isoIndicadores = await isoIndicadoresService.getAll()
        setIsoIndicadores(isoIndicadores)
        setAlreadyFetchedIsoIndicadores(true)
    }

    const fetchIsoCourses = async (params) => {
        const isoCourses = await isoCoursesService.getAll()
        setIsoCourses(isoCourses)
        setAlreadyFetchedIsoCourses(true)
    }

    const fetchIsoEncuestasCor = async (params) => {
        const isoEncuestasCor = await isoEncuestasService.getAllCor()
        setIsoEncuestasCor(isoEncuestasCor)
        setAlreadyFetchedIsoEncuestasCor(true)
    }

    const fetchIsoEncuestasIssn = async (params) => {
        const isoEncuestasIssn = await isoEncuestasService.getAllIssn()
        setIsoEncuestasIssn(isoEncuestasIssn)
        setAlreadyFetchedIsoEncuestasIssn(true)
    }

    const fetchIsoEncuestasTur = async (params) => {
        const isoEncuestasTur = await isoEncuestasService.getAllTur()
        setIsoEncuestasTur(isoEncuestasTur)
        setAlreadyFetchedIsoEncuestasTur(true)
    }

    const fetchIsoEncuestasTurr = async (params) => {
        const isoEncuestasTurr = await isoEncuestasService.getAllTurr()
        setIsoEncuestasTurr(isoEncuestasTurr)
        setAlreadyFetchedIsoEncuestasTurr(true)
    }

    const fetchIsoMinutas = async (params) => {
        const isoMinutas = await isoMinutasService.getAll()
        setIsoMinutas(isoMinutas)
        setAlreadyFetchedIsoMinutas(true)
    }

    const fetchIsoReclamosCoorporativos = async (params) => {
        const isoReclamosCoorporativos = await isoReclamosService.getAllReclamosCoorporativos()
        setIsoReclamosCoorporativos(isoReclamosCoorporativos)
        setAlreadyFetchedIsoReclamosCoorporativos(true)
    }

    const fetchIsoReclamosTurismo = async (params) => {
        const isoReclamosTurismo = await isoReclamosService.getAllReclamosTurismo()
        setIsoReclamosTurismo(isoReclamosTurismo)
        setAlreadyFetchedIsoReclamosTurismo(true)
    }

    const fetchIsoReporteGuardias = async (params) => {
        const isoReporteGuardias = await isoReporteGuardiasService.getAll()
        setIsoReporteGuardias(isoReporteGuardias)
        setAlreadyFetchedIsoReporteGuardias(true)
    }

    const fetchIsoCriterios = async (params) => {
        const isoCriterios = await isoTablasService.getAllCriterios()
        setIsoCriterios(isoCriterios)
        setAlreadyFetchedIsoCriterios(true)
    }

    const fetchIsoFormadores = async (params) => {
        const isoFormadores = await isoTablasService.getAllFormadores()
        setIsoFormadores(isoFormadores)
        setAlreadyFetchedIsoFormadores(true)
    }

    const fetchIsoOrigenes = async (params) => {
        const isoOrigenes = await isoTablasService.getAllOrigenes()
        setIsoOrigenes(isoOrigenes)
        setAlreadyFetchedIsoOrigenes(true)
    }

    const fetchIsoProcesos = async (params) => {
        const isoProcesos = await isoTablasService.getAllProcesos()
        setIsoProcesos(isoProcesos)
        setAlreadyFetchedIsoProcesos(true)
    }

    const fetchIsoTipoDocumentos = async (params) => {
        const isoTipoDocumentos = await isoTablasService.getAllDocs()
        setIsoTipoDocumentos(isoTipoDocumentos)
        setAlreadyFetchedIsoTipoDocumentos(true)
    }

    const fetchIsoCursoTemas = async (params) => {
        const isoCursoTemas = await isoTablasService.getAllCursoTemas()
        setIsoCursoTemas(isoCursoTemas)
        setAlreadyFetchedIsoCursoTemas(true)
    }

    const fetchIsoCursoProgramacion = async (params) => {
        const isoCursoProgramacion = await isoTablasService.getAllCursoProgramacion()
        setIsoCursoProgramacion(isoCursoProgramacion)
        setAlreadyFetchedIsoCursoProgramacion(true)
    }

    const fetchIsoTiempoRespuestas = async (params) => {
        const isoTiempoRespuestas = await isoTiempoRespuestaService.getAllTiempoRespuesta()
        setIsoTiempoRespuestas(isoTiempoRespuestas)
        setAlreadyFetchedIsoTiempoRespuestas(true)
    }
 
    const fetchNews = async () => {
        const news = await service.getNews()
        setNews(news)
        setAlreadyFetchedNews(true)
    }

    const fetchProvinces = async () => {
        const provinces = await provincesService.getAll()
        setProvinces(provinces)
        setAlreadyFetchedProvinces(true)
    }
    
    const fetchActivities = async () => {
        const activities = await activitiesService.getAll()
        setActivities(activities)
        setAlreadyFetchedActivities(true)
    }

    const fetchUsers = async () => {
        const users = await userService.getAll()
        setUsers(users)
        setAlreadyFetchedUsers(true)
    }

    const fetchSectors = async () => {
        const sectors = await sectorsService.getAll()
        setSectors(sectors)
        setAlreadyFetchedSectors(true)
    }

    const fetchClients = async (params = {}) => {
        const clients = await clientsService.getAll(params)
        setClients(clients)
        setAlreadyFetchedClients(true)
    }

    const fetchProviders = async (params) => {
        const providers = await providersService.getAll(params)
        if (params != undefined) return providers
        setProviders(providers)
        setAlreadyFetchedProviders(true)
    }

    const fetchIsoNcs = async (params = {}) => {
        const isoNcs = await isoNcsService.getAll(params)
        setIsoNcs(isoNcs)
        setAlreadyFetchedIsoNcs(true)
    }

    const fetchPersonals = async (params = {}) => {
        const personals = await personalsService.getAll(params)      
        if (params == undefined || Object.keys(params).length == 0) {
            setPersonals(personals)
            setAlreadyFetchedPersonals(true)
        }
        return personals
    }

    const fetchOrders = async (params = {}) => {
        const orders = await ordersService.getAll(params)
        setOrders(orders)
        setAlreadyFetchedOrders(true)
        return orders
    }

    const updateCurrentNew = async (neww) => {
        const updatedNew = await newService.updateCurrentNew(neww)
        setNews(news.map(n => n.id == neww.id ? updatedNew : n))
    }

    const deleteMyLicence = async (licenceId) => {
        await personalsService.deleteLicencia(licenceId)
        setMyLicencias(myLicencias.filter(l => l.id != licenceId))
    }
    
    const newMyLicence = async (date) => {
        const licence = await personalsService.newLicencia({
            fecha: date,
        })
        setMyLicencias([...myLicencias, licence])
    }

    const createClient = async (clientData) => {
        try {
            const newClient = await clientsService.createClient(clientData);
            setClients([...clients, newClient]);
        } catch (error) {
            console.error('Error al crear el cliente:', error);
        }
    };

    const updateClient = async (clientId, clientData) => {
        try {
            const updatedClient = await clientsService.updateClient(clientId, clientData);
            setClients(clients.map(client => client.id === clientId ? updatedClient : client));
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
        }
    };

    const deleteClient = async (clientId) => {
        try {
            const updatedClient = await clientsService.deleteClient(clientId);
            setClients(clients.map(client => client.id === clientId ? updatedClient : client));
        } catch (error) {
            console.error('Error al actualizar el cliente:', error);
        }
    };

    const createOrder = async (orderData) => {
        try {
            const newOrder = await ordersService.createOrder(orderData);
            setOrders([...orders, newOrder]);
            changeAlertStatusAndMessage(true, 'success', 'Orden creada exitosamente!');
            return newOrder;
        } catch (error) {
            console.error('Error al crear la orden:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al crear la orden');
            throw error;
        }
    };

    const updateOrder = async (orderId, orderData) => {
        try {
            const updatedOrder = await ordersService.updateOrder(orderId, orderData);
            setOrders(orders.map(order => order.id === orderId ? updatedOrder : order));
            changeAlertStatusAndMessage(true, 'success', 'Orden actualizada exitosamente!');
            return updatedOrder;
        } catch (error) {
            console.error('Error al actualizar la orden:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al actualizar la orden');
            throw error;
        }
    };

    const deleteOrder = async (orderId) => {
        try {
            const updatedOrder = await ordersService.deleteOrder(orderId);
            setOrders(orders.map(o => o.id === orderId ? updatedOrder : o));
        } catch (error) {
            console.error('Error al actualizar la orden:', error);
        }
    };

    const createProvider = async (providerData) => {
        try {
            const newProvider = await providersService.createProvider(providerData);
            setProviders([...providers, newProvider]);
            changeAlertStatusAndMessage(true, 'success', 'Operador creado exitosamente!');
            return newProvider;
        } catch (error) {
            console.error('Error al crear el operador:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al crear el operador');
            throw error;
        }
    };

    const updateProvider = async (providerId, providerData) => {
        try {
            const updatedProvider = await providersService.updateProvider(providerId, providerData);
            setProviders(providers.map(provider => 
                provider.id === providerId ? updatedProvider : provider
            ));
            changeAlertStatusAndMessage(true, 'success', 'Operador actualizado exitosamente!');
            return updatedProvider;
        } catch (error) {
            console.error('Error al actualizar el operador:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al actualizar el operador');
            throw error;
        }
    };

    const deleteProvider = async (providerId) => {
        try {
            await providersService.deleteProvider(providerId);
            setProviders(providers.filter(provider => provider.id !== providerId));
            changeAlertStatusAndMessage(true, 'success', 'Operador eliminado exitosamente!');
        } catch (error) {
            console.error('Error al eliminar el operador:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al eliminar el operador');
            throw error;
        }
    };

    const createPasaje = async (pasajeData) => {
        try {
            const newPasaje = await pasajesService.createPasaje(pasajeData);
            setPasajes([...pasajes, newPasaje]);
            changeAlertStatusAndMessage(true, 'success', 'Pasaje creado exitosamente!');
            return newPasaje;
        } catch (error) {
            console.error('Error al crear el pasaje:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al crear el pasaje');
            throw error;
        }
    };

    const updatePasaje = async (pasajeId, pasajeData) => {
        try {
            const updatedPasaje = await pasajesService.updatePasaje(pasajeId, pasajeData);
            setPasajes(pasajes.map(pasaje => 
                pasaje.id === pasajeId ? updatedPasaje : pasaje
            ));
            changeAlertStatusAndMessage(true, 'success', 'Pasaje actualizado exitosamente!');
            return updatedPasaje;
        } catch (error) {
            console.error('Error al actualizar el pasaje:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al actualizar el pasaje');
            throw error;
        }
    };

    const deletePasaje = async (pasajeId) => {
        try {
            await pasajesService.deletePasaje(pasajeId);
            setPasajes(pasajes.filter(pasaje => pasaje.id !== pasajeId));
            changeAlertStatusAndMessage(true, 'success', 'Pasaje eliminado exitosamente!');
        } catch (error) {
            console.error('Error al eliminar el pasaje:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al eliminar el pasaje');
            throw error;
        }
    };

    const approvePasaje = async (pasajeId) => {
        try {
            const updatedPasaje = await pasajesService.approvePasaje(pasajeId);
            setPasajes(pasajes.map(pasaje => 
                pasaje.id === pasajeId ? updatedPasaje : pasaje
            ));
            changeAlertStatusAndMessage(true, 'success', 'Pasaje aprobado exitosamente!');
            return updatedPasaje;
        } catch (error) {
            console.error('Error al aprobar el pasaje:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al aprobar el pasaje');
            throw error;
        }
    };


    const cancelPasaje = async (pasajeId) => {
        try {
            const updatedPasaje = await pasajesService.cancelPasaje(pasajeId);
            setPasajes(pasajes.map(pasaje => 
                pasaje.id === pasajeId ? updatedPasaje : pasaje
            ));
            changeAlertStatusAndMessage(true, 'success', 'Pasaje cancelado exitosamente!');
            return updatedPasaje;
        } catch (error) {
            console.error('Error al rechazar el pasaje:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al rechazar el pasaje');
            throw error;
        }
    };

    const createPersonal = async (personalData) => {
        try {
            const newPersonal = await personalsService.createPersonal(personalData);
            setPersonals([...personals, newPersonal]);
            changeAlertStatusAndMessage(true, 'success', 'Personal creado exitosamente!');
            return newPersonal;
        } catch (error) {
            console.error('Error al crear el personal:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al crear el personal');
            throw error;
        }
    };

    const updatePersonal = async (personalId, personalData) => {
        try {
            const updatedPersonal = await personalsService.updatePersonal(personalId, personalData);
            setPersonals(personals.map(personal => 
                personal.id === personalId ? updatedPersonal : personal
            ));
            changeAlertStatusAndMessage(true, 'success', 'Personal actualizado exitosamente!');
            return updatedPersonal;
        } catch (error) {
            console.error('Error al actualizar el personal:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al actualizar el personal');
            throw error;
        }
    };

    const deletePersonal = async (personalId) => {
        try {
            const updatedPersonal = await personalsService.deletePersonal(personalId);
            setPersonals(personals.map(personal => 
                personal.id === personalId ? updatedPersonal : personal
            ));
            changeAlertStatusAndMessage(true, 'success', 'Personal eliminado exitosamente!');
        } catch (error) {
            console.error('Error al eliminar el personal:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al eliminar el personal');
            throw error;
        }
    };

    const deleteUser = async (username) => {
        try {
            const updatedUser = await userService.deleteUser(username);
            setUsers(users.map(user => 
                user.usuario === username ? updatedUser : user
            ));
            changeAlertStatusAndMessage(true, 'success', 'Usuario eliminado exitosamente!');
        } catch (error) {
            console.error('Error al eliminar el usuario:', error);
            changeAlertStatusAndMessage(true, 'error', 'Error al eliminar el usuario');
            throw error;
        }
    };

    useEffect(() => {
        console.log("APP RUNNING IN VERSION="+APP_VERSION);
    }, [])
    

    const changeUserPassword = async (newPassword, user) => {
        return userService.changePasswordAsAdmin(newPassword, user.usuario)
    }

    return (
        <Context.Provider value={{
            news,
            alreadyFetchedNews,
            fetchNews,
            deleteMyLicence,
            newMyLicence,
            changeAlertStatusAndMessage,
            isAlertActive,
            alertMessage,
            clients,
            fetchClients,
            alreadyFetchedClients,
            fetchOrders,
            orders,
            alreadyFetchedOrders,
            providers,
            fetchProviders,
            alreadyFetchedProviders,
            personals,
            fetchPersonals,
            alreadyFetchedPersonals,
            users,
            fetchUsers,
            alreadyFetchedUsers,
            alertStatus,
            updateCurrentNew,
            provinces,
            fetchProvinces,
            alreadyFetchedProvinces,
            activities,
            fetchActivities,
            alreadyFetchedActivities,
            sectors,
            fetchSectors,
            alreadyFetchedSectors,
            isoNcs,
            fetchIsoNcs,
            alreadyFetchedIsoNcs,
            isoAud,
            alreadyFetchedIsoAud,
            fetchIsoAud,
            isoCourses,
            alreadyFetchedIsoCourses,
            fetchIsoCourses,
            isoEncuestasCor,
            alreadyFetchedIsoEncuestasCor,
            fetchIsoEncuestasCor,
            isoEncuestasIssn,
            alreadyFetchedIsoEncuestasIssn,
            fetchIsoEncuestasIssn,
            isoEncuestasTur,
            alreadyFetchedIsoEncuestasTur,
            fetchIsoEncuestasTur,
            isoEncuestasTurr,
            alreadyFetchedIsoEncuestasTurr,
            fetchIsoEncuestasTurr,
            isoMinutas,
            alreadyFetchedIsoMinutas,
            fetchIsoMinutas,
            isoReclamosCoorporativos,
            alreadyFetchedIsoReclamosCoorporativos,
            fetchIsoReclamosCoorporativos,
            isoReclamosTurismo,
            alreadyFetchedIsoReclamosTurismo,
            fetchIsoReclamosTurismo,
            isoReporteGuardias,
            alreadyFetchedIsoReporteGuardias,
            fetchIsoReporteGuardias,
            isoCriterios,
            alreadyFetchedIsoCriterios,
            fetchIsoCriterios,
            isoFormadores,
            alreadyFetchedIsoFormadores,
            fetchIsoFormadores,
            isoOrigenes,
            alreadyFetchedIsoOrigenes,
            fetchIsoOrigenes,
            isoProcesos,
            alreadyFetchedIsoProcesos,
            fetchIsoProcesos,
            isoTipoDocumentos,
            alreadyFetchedIsoTipoDocumentos,
            fetchIsoTipoDocumentos,
            isoCursoTemas,
            alreadyFetchedIsoCursoTemas,
            fetchIsoCursoTemas,
            isoTiempoRespuestas,
            alreadyFetchedIsoTiempoRespuestas,
            fetchIsoTiempoRespuestas,
            fetchIsoEvaluacionesVentas,
            alreadyFetchedIsoEvaluacionesVentas,
            alreadyFetchedIsoEvaluacionesVentasCoorporativo,
            alreadyFetchedIsoEvaluacionesAdministrativo,
            isoEvaluacionesVentas,
            isoEvaluacionesVentasCoorporativo,
            isoEvaluacionesAdministrativo,
            fetchIsoEvaluacionesVentasCoorporativo,
            fetchIsoEvaluacionesAdministrativo,
            isoIndicadores,
            fetchIsoIndicadores,
            alreadyFetchedIsoIndicadores,
            fetchPasajes,
            pasajes,
            alreadyFetchedPasajes,
            myLicencias,
            fetchMyLicencias,
            alreadyFetchedMyLicencias,
            puestos,
            alreadyFetchedPuestos,
            fetchPuestos,
            alreadyFetchedIsoCursoProgramacion,
            isoCursoProgramacion,
            fetchIsoCursoProgramacion,
            createClient,
            updateClient,
            deleteClient,
            createOrder,
            updateOrder,
            deleteOrder,
            createProvider,
            updateProvider,
            deleteProvider,
            createPasaje,
            updatePasaje,
            deletePasaje,
            approvePasaje,
            cancelPasaje,
            createPersonal,
            updatePersonal,
            deletePersonal,
            parameters,
            alreadyFetchedParameters,
            fetchParameters,
            updateParameters,
            changeUserPassword,
            deleteUser,
        }}>
            {children}
        </Context.Provider>
    );
}