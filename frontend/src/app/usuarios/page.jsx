"use client"
import React, { useMemo, useEffect, useState, useContext } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { tableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import ModalCreateUser from "../components/modals/ModalCreateUser";
import { Context } from "../context/Context";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import KeyIcon from '@mui/icons-material/Key';
import TableActionButton from "../components/buttons/tableActionButton";
import ModalDeleteUser from "../components/modals/ModalDeleteUser";
import ModalEditUser from "../components/modals/ModalEditUser";
import useUsers from "../hooks/useUsers";
import ModalChangeUserPassword from "../components/modals/ModalChangeUserPassword";

export default function Usuarios() {
  const createUserModal = useModal()
  const users = useUsers()
  const [selectedUser, setSelectedUser] = useState({});
  const deleteUserModal = useModal()
  const editUserModal = useModal()
  const changePasswordModal = useModal()

  const openDeleteModal = (user) => {
    setSelectedUser(user);
    deleteUserModal.open();
  }

  const openChangePasswordModal = (user) => {
    setSelectedUser(user);
    changePasswordModal.open();
  }

  const openEditModal = (user) => {
    setSelectedUser(user);
    editUserModal.open();
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.firstName + ' ' + row.lastName,
        //maxWidth: '80px'
      },
      {
        name: 'Usuario',
        sortable: true,
        searchable: false,
        selector: row => row.username,
        //maxWidth: '80px'
      },
      {
        name: 'Correo',
        sortable: true,
        searchable: false,
        selector: row => row.email || 'No informado',
        //maxWidth: '80px'
      },
      {
        name: 'Cliente',
        sortable: true,
        searchable: false,
        selector: row => row.client.businessName,
        //maxWidth: '80px'
      },
      {
        name: 'Perfil',
        sortable: true,
        searchable: false,
        selector: row => row.profile.name,
        //maxWidth: '80px'
      },
      {
        name: 'Acciones',
        maxWidth: '20%',
        cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<EditIcon color="primary" />} onClick={() => openEditModal(row)} /><TableActionButton actionIcon={<DeleteIcon color="error" />} onClick={() => openDeleteModal(row)} /><TableActionButton actionIcon={<KeyIcon />} onClick={() => openChangePasswordModal(row)} /></div>
      },
    ];
    return newColumns;
}, [users]); 

  return (
    <>
        <Container>
            <div className="shadow rounded-lg">
                <MainHeader mainTitle="Usuarios" onClickActionText={createUserModal.open} actionText={<span className="flex items-center"><AddIcon className="mr-2" />Agregar Usuario</span>} />
                <hr/>
                <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
                  <Table
                    key={users.length}
                    className="shadow"
                    customStyles={tableCustomStyles}
                    columns={columns}
                    data={users}
                    striped
                    responsive
                    pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                    conditionalRowStyles={[
                      {
                        when: row => row.inactive == 1,
                        style: { color: 'gray' },
                      },
                    ]}
                  />
                </div>
            </div>
            <ModalCreateUser {...createUserModal}></ModalCreateUser>
            <ModalEditUser user={selectedUser} cleanSelectedUser={() => setSelectedUser({})} {...editUserModal}></ModalEditUser>
            <ModalDeleteUser user={selectedUser} cleanSelectedUser={() => setSelectedUser({})} {...deleteUserModal}></ModalDeleteUser>
            <ModalChangeUserPassword user={selectedUser} cleanSelectedUser={() => setSelectedUser({})} {...changePasswordModal}></ModalChangeUserPassword>
        </Container>
    </>
  )
}
