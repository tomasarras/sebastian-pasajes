import { useState, useEffect, useContext } from 'react';
import HamburgerButton from "./hamburger";
import CloseIcon from '@mui/icons-material/Close';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter, usePathname } from 'next/navigation'
import NavItem from './navbar/navItem';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
//import { Context } from '../context/Context';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SettingsIcon from '@mui/icons-material/Settings';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import useAuth from '../hooks/ordenes-pagos/useAuth';
import useModal from '../hooks/useModal';
import BackupTableIcon from '@mui/icons-material/BackupTable';
import ModalUserAccount from './modals/ordenes-pagos/ModalUserAccount';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import logo from "../../../public/intranet.png"
import Image from 'next/image';
import { List } from '@mui/material';
import useToggle from '../hooks/useToggle';
import Link from 'next/link';
import { OPProvider } from '../context/OPContext';
import OPSnackBar from './opSnackBar';

export default function OPLayout({ children }) {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const userData = useAuth()
	const router = useRouter();
	//const { isAdmin, logout } = useContext(Context);
	const modalUserAccount = useModal()
	const [isOpenSgc, toggleSgc] = useToggle();
	const [isOpenGeneral, toggleGeneral] = useToggle();

	

	const closeSession = () => {
		localStorage.removeItem('opAccessToken');
		localStorage.removeItem('opUserInfo');
		router.push('/ordenes-pagos/login');
	};

	const openSidebar = () => setIsOpenSidebar(true);
	const closeSidebar = () => setIsOpenSidebar(false);

	const pathname = usePathname();

	useEffect(() => {
		if (isOpenSidebar) closeSidebar();
	}, [pathname]);

	return (
		<OPProvider>
			<span className="absolute right-0 top-0"><OPSnackBar /></span>
			<header className={`fixed w-full right-0 top-0 z-50 md:-right-32 shadow py-3 px-4 h-24 op-header`}>
				<div className="max-w-5xl mx-auto my-4 sm:my-0 grid content-center justify-end">
					<div>
						<div className="md:hidden my-auto">
							<HamburgerButton onClick={openSidebar} />
						</div>
						<div className="text-gray-800 my-auto">
							{userData &&
								<Menu as="div" className="md:block hidden relative inline-block text-left">
									<div>
										<MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 flex items-center">
											<span className="py-4 flex items-center rounded-lg p-2 space-x-2">
												{userData.imageUrl === undefined && <div className="mx-auto rounded-full -my-4 w-10 h-10 border-2 border-gray-700 text-gray-700 font-medium flex items-center justify-center uppercase">{userData.firstName.slice(0, 1) + userData.lastName.slice(0, 1)}</div>}
												{userData.imageUrl !== undefined && <img className="mx-auto rounded-full -my-4 w-10 h-10" src={userData.imageUrl} />}
												<span className="hidden md:block">{userData?.firstName + ' ' + userData?.lastName}</span>
											</span>
											<ChevronDownIcon aria-hidden="true" className="-mr-1 h-5 w-5 text-gray-400" />
										</MenuButton>
									</div>

									<MenuItems
										transition
										className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
									>
										<div className="py-1">
											<MenuItem>
												<div onClick={modalUserAccount.open} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
													Mi cuenta
												</div>
											</MenuItem>
											<MenuItem>
												<Link href="/ordenes-pagos/mis-licencias" className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
													Mis licencias
												</Link>
											</MenuItem>
											<MenuItem>
												<div onClick={closeSession} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
													Salir
												</div>
											</MenuItem>
										</div>
									</MenuItems>
								</Menu>
							}
						</div>
					</div>
				</div>
			</header>
			<aside className={`op-sidebar ${isOpenSidebar ? "translate-x-0 w-full sm:w-5/12" : "translate-x-full w-0"} md:translate-x-0 md:w-64 z-50 transition-transform bg-white fixed overflow-y-auto inset-y-0 left-0 shadow-md max-h-screen`}>
				<div className="flex flex-col justify-between h-full">
					<div className="flex-grow">
						<div className="px-4 py-6 text-center bg-white shadow md:shadow-none op-sidebar">
							<div className="md:hidden flex w-full justify-between items-center">
								<div className="flex items-center">
								</div>
								<CloseIcon color='action' className="cursor-pointer" onClick={closeSidebar} />
							</div>
							<Link href="/ordenes-pagos/inicio"><Image alt='logo' src={logo} className="mx-auto hidden md:block rounded-2xl" /></Link>
						</div>
						<div className="py-4 md:pb-4 md:pt-0 px-2">
							<ul className="space-y-3">
								<li><NavItem className={`${pathname === '/ordenes-pagos/clientes' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white`} icon={<HandshakeIcon />} href="/ordenes-pagos/clientes" navText="Clientes" /></li>
								<li><NavItem className={`${pathname === '/ordenes-pagos/ordenes' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white`} icon={<ReceiptLongIcon />} href="/ordenes-pagos/ordenes" navText="Ordenes pago" /></li>
								<li><NavItem className={`${pathname === '/ordenes-pagos/operadores' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white`} icon={<SupportAgentIcon />} href="/ordenes-pagos/operadores" navText="Operadores" /></li>
								<li><NavItem className={`${pathname === '/ordenes-pagos/pasajes' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white`} icon={<AirplaneTicketIcon />} href="/ordenes-pagos/pasajes" navText="Pasajes" /></li>
								<li><NavItem className={`${pathname === '/ordenes-pagos/personal' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white`} icon={<SupervisorAccountIcon />} href="/ordenes-pagos/personal" navText="Personal" /></li>
								<li>
									<button onClick={toggleSgc} className='w-full'>
										<NavItem className={`${pathname && pathname.includes('sgc') ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} icon={<SettingsIcon />} href={pathname} endIcon={isOpenSgc ? <ExpandLess /> : <ExpandMore />} navText="SGC" />	
									</button>
									<Collapse in={isOpenSgc} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/acciones' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/acciones" navText="Acciones" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/auditorias' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/auditorias" navText="Auditorias" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/capacitaciones' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/capacitaciones" navText="Capacitaciones" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/documentos' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/documentos" navText="Documentos" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/encuestas' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/encuestas" navText="Encuestas" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/evaluaciones' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/evaluaciones" navText="Evaluaciones" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/indicadores' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/indicadores" navText="Indicadores" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/minutas' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/minutas" navText="Minutas" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/reclamos' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/reclamos" navText="Reclamos" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/reporte-guardia' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/reporte-guardia" navText="Reporte Guardia" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/tiempo-respuesta' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/tiempo-respuesta" navText="T. Respuesta" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleSgc}>
												<NavItem className={`${pathname === '/ordenes-pagos/sgc/tablas' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/sgc/tablas" navText="Tablas" />	
											</ListItemButton>
										</List>
									</Collapse>
								</li>
								<li>
									<button onClick={toggleGeneral} className='w-full'>
										<NavItem className={`${pathname && pathname.includes('general') ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} icon={<SettingsIcon />} href={pathname} endIcon={isOpenGeneral ? <ExpandLess /> : <ExpandMore />} navText="General" />	
									</button>
									<Collapse in={isOpenGeneral} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleGeneral}>
												<NavItem className={`${pathname === '/ordenes-pagos/general/licencias' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/general/licencias" navText="Licencias" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleGeneral}>
												<NavItem className={`${pathname === '/ordenes-pagos/general/mi-empresa' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/general/mi-empresa" navText="Mi Empresa" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleGeneral}>
												<NavItem className={`${pathname === '/ordenes-pagos/general/noticias' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/general/noticias" navText="Noticias" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={toggleGeneral}>
												<NavItem className={`${pathname === '/ordenes-pagos/general/usuarios' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white w-full`} href="/ordenes-pagos/general/usuarios" navText="Usuarios" />	
											</ListItemButton>
										</List>
									</Collapse>
								</li>
								<li><NavItem className={`${pathname === '/ordenes-pagos/tablas' ? 'op-sidebar-selected' : 'op-sidebar-hover'} text-white`} icon={<BackupTableIcon />} href="/ordenes-pagos/tablas" navText="Tablas" /></li>
							</ul>
						</div>
					</div>
				</div>
			</aside>

			<div className="mt-24 md:ml-64 flex-1 items-center justify-center">{children}</div>
			<ModalUserAccount {...modalUserAccount} />
		</OPProvider>
	);
} 