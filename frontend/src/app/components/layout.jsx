import { useState, useEffect, useContext } from 'react';
import HamburgerButton from "./hamburger";
import CloseIcon from '@mui/icons-material/Close';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { useRouter, usePathname } from 'next/navigation'
import NavItem from './navbar/navItem';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import { Context } from '../context/Context';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import useAuth from '../hooks/useAuth';
import useModal from '../hooks/useModal';
import ModalUserAccount from './modals/ModalUserAccount';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

export default function Layout({ children }) {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const [route, setRoute] = useState('/users');
	const userData = useAuth()
	const router = useRouter();
	const { isAdmin, logout } = useContext(Context);
	const modalUserAccount = useModal()
	const [open, setOpen] = useState(true);

	const handleClick = () => {
	  setOpen(!open);
	};

	const closeSession = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userInfo');
		console.log("closeSession");
		router.push('/login');
	};

	const openSidebar = () => setIsOpenSidebar(true);
	const closeSidebar = () => setIsOpenSidebar(false);

	const pathname = usePathname();

	useEffect(() => {
		if (isOpenSidebar) closeSidebar();
	}, [pathname]);

	return (
		<>
			<header className="fixed w-full right-0 top-0 z-50 md:-right-32 shadow py-3 px-4 h-24 bg-white">
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
			<aside className={`${isOpenSidebar ? "translate-x-0 w-full sm:w-5/12" : "translate-x-full w-0"} md:translate-x-0 md:w-64 z-50 transition-transform bg-white fixed overflow-y-auto inset-y-0 left-0 shadow-md max-h-screen`}>
				<div className="flex flex-col justify-between h-full">
					<div className="flex-grow">
						<div className="px-4 py-6 text-center bg-white shadow md:shadow-none">
							<div className="md:hidden flex w-full justify-between items-center">
								<div className="flex items-center">
								</div>
								<CloseIcon color='action' className="cursor-pointer" onClick={closeSidebar} />
							</div>
							<img className="mx-auto hidden md:block rounded-2xl" src="/logo (1).png" />
						</div>
						<div className="py-4 md:pb-4 md:pt-0 px-2">
							<ul className="space-y-3">
								<li><NavItem className={`${pathname === '/ordenes' ? 'bg-primary-900' : 'hover:bg-gray-100'}`} icon={<ReceiptLongIcon />} href="/ordenes" navText="Ordenes" /></li>
								<li className={!userData?.isAdmin && 'hidden'}><NavItem className={`${pathname === '/clientes' ? 'bg-primary-900' : 'hover:bg-gray-100'}`} icon={<HandshakeIcon />} href="/clientes" navText="Clientes" /></li>
								<li className={!userData?.isAdmin && 'hidden'}><NavItem className={`${pathname === '/grupos' ? 'bg-primary-900' : 'hover:bg-gray-100'}`} icon={<GroupsIcon />} href="/grupos" navText="Grupos" /></li>
								<li className={!userData?.isAdmin && 'hidden'}><NavItem className={`${pathname === '/usuarios' ? 'bg-primary-900' : 'hover:bg-gray-100'}`} icon={<PermIdentityIcon />} href="/usuarios" navText="Usuarios" /></li>
								<li className={(userData?.isAdmin || userData?.isAgent) ? '' : "hidden"}>
									<button onClick={handleClick} className='w-full'>
										<NavItem className={`${pathname === '/empresa' ? 'bg-primary-900' : 'hover:bg-gray-100'} w-full`} icon={<SettingsIcon />} href={pathname} endIcon={open ? <ExpandLess /> : <ExpandMore />} navText="Configuración" />	
									</button>
									<Collapse in={open} timeout="auto" unmountOnExit>
										<List component="div" disablePadding>
											<ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
												<NavItem className={`${pathname === '/empresa' ? '' : ''} w-full`} href="/empresa" navText="Empresa" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
												<NavItem className={`${pathname === '/empresa' ? '' : ''} w-full`} href="/localidades" navText="Localidades" />	
											</ListItemButton>
											<ListItemButton sx={{ pl: 4 }} onClick={handleClick}>
												<NavItem className={`${pathname === '/empresa' ? '' : ''} w-full`} href="/provincias" navText="Provincias" />	
											</ListItemButton>
										</List>
									</Collapse>
								</li>
							</ul>
						</div>
					</div>
				</div>
			</aside>

			<div className="mt-24 md:ml-64 flex-1 items-center justify-center">{children}</div>
			<ModalUserAccount {...modalUserAccount} />
		</>
	);
} 