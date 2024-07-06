"use client"
import React, { useMemo, useState } from "react";
import Container from "../components/Container";
import AddIcon from '@mui/icons-material/Add';
import MainHeader from "../components/MainHeader";
import { tableCustomStyles } from "../../../utils";
import Table from "../components/table";
import useModal from "../hooks/useModal";
import ModalCreateGroup from "../components/modals/ModalCreateGroup";

export default function Grupos() {
  const [groups, setGroups] = useState([{ name: 'Azucar' }]);
  const createGroupModal = useModal()

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
        minWidth: '180px',
        cell: row => {
          return (<div className="flex-row"></div>)
        },
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
          <div className="px-2 md:px-4 py-8 md:py-16 bg-white">
            <Table
              className="shadow"
              customStyles={tableCustomStyles}
              columns={columns}
              data={groups}
              striped
              responsive
              pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
            />
          </div>
        </div>
        <ModalCreateGroup {...createGroupModal}/>
      </Container>
    </>
  )
}
