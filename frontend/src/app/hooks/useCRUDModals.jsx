"use client"

import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import useModal from "./useModal";
import AddItemButton from "../components/buttons/addItemButton";
import { capitalize } from "@mui/material";
import TableActionButton from "../components/buttons/tableActionButton";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function useCRUDModals(entityName) {
  const createModal = useModal()
  const editModal = useModal()
  const deleteModal = useModal()
  const [selectedEntity, setSelectedEntity] = useState(null)

  const mainHeaderProps = {
    onClickActionText: createModal.open,
    actionText: <AddItemButton actionText={`Agregar ${capitalize(entityName)}`}/>
  }

  const createModalProps = {
    entityName,
    ...createModal
  }

  const editModalProps = {
    entityName,
    ...editModal
  }

  const deleteModalProps = {
    id: selectedEntity?.id,
    type: entityName,
    ...deleteModal
  }

  const openEditModal = row => {
    editModal.open()
    setSelectedEntity(row)
  }

  const openDeleteModal = row => {
    deleteModal.open()
    setSelectedEntity(row)
  }

  const actionColumn = {
    name: 'Acciones',
    maxWidth: '80px',
    cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<EditIcon color="primary" />} onClick={() => openEditModal(row)} /><TableActionButton actionIcon={<DeleteIcon color="error" />} onClick={() => openDeleteModal(row)} /></div>
  }
  
  return {
    createModal,
    editModal,
    deleteModal,
    mainHeaderProps,
    createModalProps,
    deleteModalProps,
    editModalProps,
    actionColumn,
    selectedEntity,
  }
}