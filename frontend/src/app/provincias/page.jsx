"use client"
import React, { useMemo, useState, useEffect, useContext } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { tableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import { create, edit } from "@/app/services/provinceService";
import { deleteById } from "@/app/services/provinceService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableActionButton from "../components/buttons/tableActionButton";
import useProvinces from "../hooks/useProvinces";
import ModalCreateProvince from "../components/modals/ModalCreateProvince";
import GenericModalDelete from "../components/modals/GenericModalDelete";
import { Context } from "../context/Context";

export default function Provincias() {
  const provinces = useProvinces();
  const { fetchProvinces } = useContext(Context)
  const createProvinceModal = useModal()
  const deleteProvinceModal = useModal()
  const editProvinceModal = useModal()
  const [selectedProvince, setSelectedProvince] = useState(null)

  const handleOnDelete = async () => {
    await deleteById(selectedProvince.id)
    await fetchProvinces()
    deleteProvinceModal.close()
  }

  const openDeleteModal = (province) => {
    deleteProvinceModal.open()
    setSelectedProvince(province)
  }

  const openEditModal = (province) => {
    setSelectedProvince(province)
    editProvinceModal.open()
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: true,
        selector: row => row.name,
        //maxWidth: '80px'
      },
      {
        name: 'Acciones',
        maxWidth: '20%',
        cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<EditIcon />} onClick={() => openEditModal(row)} /><TableActionButton actionIcon={<DeleteIcon />} onClick={() => openDeleteModal(row)} /></div>
      },
    ];
    return newColumns;
  }, [provinces]);

  return (
    <>
      <Container>
        <div className="shadow rounded-lg">
          <MainHeader mainTitle="Provincias" actionText={<span className="flex items-center"><AddIcon className="mr-2" />Agregar Provincia</span>} onClickActionText={createProvinceModal.open} />
          <hr />
          {
            provinces.length > 0 && (
              <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
                <Table
                  className="shadow"
                  customStyles={tableCustomStyles}
                  columns={columns}
                  data={provinces}
                  noDataComponent="No se han encontrado provincias"
                  striped
                  responsive
                  pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                />
              </div>
            )
          }
        </div>
        <ModalCreateProvince onSubmit={create} {...createProvinceModal}/>
        <ModalCreateProvince onSubmit={edit} province={selectedProvince} {...editProvinceModal}/>
        <GenericModalDelete onDelete={handleOnDelete} label={selectedProvince?.name} type={"provincia"} id={selectedProvince?.id} {...deleteProvinceModal}/>
      </Container>
    </>
  )
}
