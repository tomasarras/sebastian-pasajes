"use client"
import React, { useContext, useEffect, useMemo, useState } from "react";
import Container from "../components/Container";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import MainHeader from "../components/MainHeader";
import { deleteClient } from "@/app/services/clientService";
import { tableCustomStyles } from "../../../utils";
import { createClient, editClient } from "@/app/services/clientService";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import ModalCreateClient from "../components/modals/ModalCreateClient";
import useClients from "../hooks/useClients";
import { formatNextBookCode } from "../utils/utils";
import TableActionButton from "../components/buttons/tableActionButton";
import GenericModalDelete from "../components/modals/GenericModalDelete";
import { Context } from "../context/Context";
import AddItemButton from "../components/buttons/addItemButton";
import FilterClientsModal from "../components/modals/FilterClientsModal";
import TableFilters from "../components/table/tableFilters";

export default function Clientes() {
  const clients = useClients();
  const createClientModal = useModal()
  const deleteClientModal = useModal()
  const editClientModal = useModal()
  const filterModal = useModal()
  const [selectedClient, setSelectedClient] = useState(null)
  const [filterOptions, setFilterOptions] = useState(null)
  const [filteredClients, setFilteredClients] = useState(null)
  const { fetchClients } = useContext(Context)

  const openDeleteModal = (client) => {
    setSelectedClient(client);
    deleteClientModal.open();
  }

  const handleOnDelete = async () => {
    await deleteClient(selectedClient.id)
    setSelectedClient({})
    deleteClientModal.close();
    await fetchClients()
  }

  const openEditModal = (client) => {
    setSelectedClient(client);
    editClientModal.open();
  }

  const updateFiterClients = async () => {
    const data = await fetchClients(filterOptions)
    console.log("receibed", data, filterOptions);
    setFilteredClients(data)
  }
  
  useEffect(() => {
    updateFiterClients()
  }, [filterOptions])

  useEffect(() => {
    console.log("df", filteredClients);
  }, [filteredClients])
  
  

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Razón Social',
        sortable: true,
        searchable: true,
        selector: row => row.businessName,
        //maxWidth: '80px'
      },
      {
        name: 'Talonario',
        sortable: true,
        searchable: true,
        selector: row => formatNextBookCode(row.nextBookCode),
        //maxWidth: '80px'
      },
      {
        name: 'CUIT',
        sortable: true,
        searchable: true,
        selector: row => row.cuit,
        //maxWidth: '80px'
      },
      {
        name: 'Télefonos',
        sortable: false,
        searchable: true,
        selector: row => row.phones,
        //maxWidth: '80px'
      },
      {
        name: 'Acciones',
        maxWidth: '20%',
        cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<EditIcon color="primary" />} onClick={() => openEditModal(row)} /><TableActionButton actionIcon={<DeleteIcon color="error" />} onClick={() => openDeleteModal(row)} /></div>
      },
    ];
    return newColumns;
  }, [clients]); 

  return (
    <>
        <Container>
            <div className="shadow rounded-lg">
                <MainHeader
                  onOpenFilterModal={filterModal.open}
                  mainTitle="Clientes"
                  onClickActionText={createClientModal.open}
                  actionText={<AddItemButton actionText="Agregar Cliente"/>}
                />
                <hr/>
                <TableFilters filters={filterOptions} setFilters={setFilterOptions}/>
                <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
                  <Table
                    className="shadow"
                    customStyles={tableCustomStyles}
                    columns={columns}
                    data={filterOptions != null ? filteredClients : clients}
                    striped
                    responsive
                    pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                  />
                </div>
            </div>
        </Container>
        <FilterClientsModal onApplyFilter={setFilterOptions} {...filterModal}/>
        <ModalCreateClient onSubmit={createClient} {...createClientModal}/>
        <ModalCreateClient client={selectedClient} onSubmit={editClient} {...editClientModal}/>
        <GenericModalDelete id={selectedClient?.id} type={"cliente"} label={selectedClient?.businessName} onDelete={handleOnDelete} {...deleteClientModal}/>
    </>
  )
}
