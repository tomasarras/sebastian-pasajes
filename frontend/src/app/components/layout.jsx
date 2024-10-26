import { useState, useEffect, useContext } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { usePathname } from 'next/navigation'
import NavItem from './navbar/navItem';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupsIcon from '@mui/icons-material/Groups';
import useAuth from '../hooks/useAuth';
import useModal from '../hooks/useModal';
import ModalUserAccount from './modals/ModalUserAccount';
import logo from '../../../public/logo.png'
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import AuthenticatedHeader from './header/AuthenticatedHeader';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import Image from 'next/image';

export default function Layout({ children }) {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);
	const userData = useAuth()
	const modalUserAccount = useModal()
	const [open, setOpen] = useState(true);

	const handleClick = () => {
	  setOpen(!open);
	};

	const openSidebar = () => setIsOpenSidebar(true);
	const closeSidebar = () => setIsOpenSidebar(false);

	const pathname = usePathname();

	useEffect(() => {
		if (isOpenSidebar) closeSidebar();
	}, [pathname]);

	return (
		<>
			<AuthenticatedHeader onClickOpenSidebar={openSidebar}/>
			<aside className={`${isOpenSidebar ? "translate-x-0 w-full sm:w-5/12" : "translate-x-full w-0"} md:translate-x-0 md:w-64 z-50 transition-transform bg-white fixed overflow-y-auto inset-y-0 left-0 shadow-md max-h-screen`}>
				<div className="flex flex-col justify-between h-full">
					<div className="flex-grow">
						<div className="px-4 py-6 text-center bg-white shadow md:shadow-none">
							<div className="md:hidden flex w-full justify-between items-center">
								<div className="flex items-center">
								</div>
								<CloseIcon color='action' className="cursor-pointer" onClick={closeSidebar} />
							</div>
							<Image className="mx-auto hidden md:block rounded-2xl" src={logo} alt="logo" />
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