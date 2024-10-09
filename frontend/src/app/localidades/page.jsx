"use client"
import React, { useMemo, useState, useEffect, useContext } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { tableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import { deleteById, edit, create } from "../services/locationService";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TableActionButton from "../components/buttons/tableActionButton";
import useLocations from "../hooks/useLocations";
import { Context } from "../context/Context";
import GenericModalDelete from "../components/modals/GenericModalDelete";
import ModalCreateLocation from "../components/modals/ModalCreateLocation";

export default function Localidades() {
  const locations = useLocations();
  const { fetchLocations } = useContext(Context)
  const createLocationModal = useModal()
  const deleteLocationModal = useModal()
  const editLocationModal = useModal()
  const [selectedLocation, setSelectedLocation] = useState(null)

  const openEditModal = async (location) => {
    setSelectedLocation(location)
    editLocationModal.open()
  }
  const openDeleteModal = async (location) => {
    setSelectedLocation(location)
    deleteLocationModal.open()
  }

  const handleOnDelete = async () => {
    await deleteById(selectedLocation.id)
    await fetchLocations()
    deleteLocationModal.close()
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
        name: 'Codigo postal',
        sortable: true,
        searchable: false,
        selector: row => row.postalCode,
        //maxWidth: '80px'
      },
      {
        name: 'Provincia',
        sortable: true,
        searchable: true,
        selector: row => row?.province?.name,
        //maxWidth: '80px'
      },
      {
        name: 'Acciones',
        maxWidth: '20%',
        cell: row => <div className="flex flex-nowrap"><TableActionButton actionIcon={<EditIcon />} onClick={() => openEditModal(row)} /><TableActionButton actionIcon={<DeleteIcon />} onClick={() => openDeleteModal(row)} /></div>
      },
    ];
    return newColumns;
  }, [locations]);

  return (
    <>
      <Container>
        <div className="shadow rounded-lg">
          <MainHeader mainTitle="Localidades" actionText={<span className="flex items-center"><AddIcon className="mr-2" />Agregar Localidad</span>} onClickActionText={createLocationModal.open} />
          <hr />
          {
            locations.length > 0 && (
              <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
                <Table
                  className="shadow"
                  customStyles={tableCustomStyles}
                  columns={columns}
                  data={locations}
                  noDataComponent="No se han encontrado localidades"
                  striped
                  responsive
                  pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
                />
              </div>
            )
          }
        </div>
        <ModalCreateLocation onSubmit={create} {...createLocationModal}/>
        <ModalCreateLocation location={selectedLocation} onSubmit={edit} {...editLocationModal}/>
        <GenericModalDelete onDelete={handleOnDelete} label={selectedLocation?.name} type={"localidad"} id={selectedLocation?.id} {...deleteLocationModal}/>
      </Container>
    </>
  )
}
