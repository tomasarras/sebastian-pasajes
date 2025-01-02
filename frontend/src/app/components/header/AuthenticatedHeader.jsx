import React, { useState } from 'react'
import HamburgerButton from "../hamburger";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import useAuth from '@/app/hooks/useAuth';
import useModal from '@/app/hooks/useModal';
import ModalUserAccount from '../modals/ModalUserAccount';

const AuthenticatedHeader = ({ onClickOpenSidebar }) => {
	const userData = useAuth()
	const modalUserAccount = useModal()

	const closeSession = () => {
		localStorage.removeItem('accessToken');
		localStorage.removeItem('userInfo');
	};


	return (<>
		<header className="fixed w-full right-0 top-0 z-50 shadow py-3 px-4 h-24 bg-white">
			<div className="my-4 sm:my-0 grid content-center justify-end">
				<div>
					<div className="md:hidden my-auto">
						<HamburgerButton onClick={onClickOpenSidebar} />
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
											<a href='/login' onClick={closeSession} className="cursor-pointer block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900">
												Salir
											</a>
										</MenuItem>
									</div>
								</MenuItems>
							</Menu>
						}
					</div>
				</div>
			</div>
		</header>
		<ModalUserAccount {...modalUserAccount} />
	</>
	)
}

export default AuthenticatedHeader