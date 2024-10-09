"use client"
import React, { useMemo, useState, useEffect } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { tableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import ModalCreateGroup from "../components/modals/ModalCreateGroup";
import useGroups from "@/app/hooks/useGroups";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableActionButton from "../components/buttons/tableActionButton";
import ModalDeleteGroup from "../components/modals/ModalDeleteGroup";
import ModalEditGroup from "../components/modals/ModalEditGroup";

export default function Grupos() {
  const groups = useGroups();
  const [selectedGroup, setSelectedGroup] = useState({});
  const createGroupModal = useModal()
  const deleteGroupModal = useModal()
  const editGroupModal = useModal()

  const openDeleteModal = (group) => {
    setSelectedGroup(group);
    deleteGroupModal.open();
  }

  const openEditModal = (group) => {
    setSelectedGroup(group);
    editGroupModal.open();
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => row.name,
        //maxWidth: '80px'
      },
      {
        name: 'Acciones',
        maxWidth: '20%',
        cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<EditIcon color="primary" />} onClick={() => openEditModal(row)} /><TableActionButton actionIcon={<DeleteIcon color="error" />} onClick={() => openDeleteModal(row)} /></div>
      },
    ];
    return newColumns;
  }, [groups]);

  return (
    <>
      <Container>
        <div className="shadow rounded-lg">
          <MainHeader mainTitle="Grupos" actionText={<span className="flex items-center"><AddIcon className="mr-2" />Agregar Grupo</span>} onClickActionText={createGroupModal.open} />
          <hr />
          {
            groups.length > 0 && (
              <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
                <Table
                  key={groups.length}
                  className="shadow"
                  customStyles={tableCustomStyles}
                  columns={columns}
                  data={groups}
                  noDataComponent="No se han encontrado grupos"
                  striped
                  responsive
                  pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                />
              </div>
            )
          }
        </div>
        <ModalCreateGroup {...createGroupModal}/>
        <ModalEditGroup group={selectedGroup} cleanSelectedGroup={() => setSelectedGroup({})} {...editGroupModal}></ModalEditGroup>
        <ModalDeleteGroup group={selectedGroup} cleanSelectedGroup={() => setSelectedGroup({})} {...deleteGroupModal}></ModalDeleteGroup>
      </Container>
    </>
  )
}
