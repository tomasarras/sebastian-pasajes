"use client"
import CommonInput from "@/app/components/commonInput";
import Container from "@/app/components/Container";
import MainHeader from "@/app/components/MainHeader";
import GenericModalDelete from "@/app/components/modals/GenericModalDelete";
import ModalCreateUser from "@/app/components/modals/ordenes-pagos/ModalCreateUser";
import ModalCreateOperator from "@/app/components/ordenes-pago/modals/ModalCreateOperator";
import ModalCreateOrder from "@/app/components/ordenes-pago/modals/ModalCreateOrder";
import ModalCreateProvince from "@/app/components/ordenes-pago/modals/ModalCreateProvince";
import ModalCreateWithSimpleName from "@/app/components/ordenes-pago/modals/ModalCreateWithSimpleName";
import Table from "@/app/components/table";
import useUsers from "@/app/hooks/ordenes-pagos/useUsers";
import useCRUDModals from "@/app/hooks/useCRUDModals";
import Link from "next/link";
import React, { useContext, useMemo, useState } from "react";
import KeyIcon from '@mui/icons-material/Key';
import TableActionButton from "@/app/components/buttons/tableActionButton";
import useModal from "@/app/hooks/useModal";
import ModalChangeUserPassword from "@/app/components/modals/ordenes-pagos/ModalChangeUserPassword";
import { Context } from "@/app/context/OPContext";

export default function OrdenesPagoUsuarios() {
  const { deleteUser } = useContext(Context)
  const rawUsers = useUsers()
  
  // Ordenar usuarios: primero los que no están dados de baja, luego los que sí
  const users = useMemo(() => {
    if (!rawUsers || rawUsers.length === 0) return [];
    
    return [...rawUsers].sort((a, b) => {
      // Verificar si tiene fecha de baja válida (diferente de '0000-00-00')
      const aHasBaja = a.fechaBaja && a.fechaBaja !== '0000-00-00';
      const bHasBaja = b.fechaBaja && b.fechaBaja !== '0000-00-00';
      
      if (aHasBaja === bHasBaja) {
        // Si ambos tienen el mismo estado de baja, mantener el orden original
        return 0;
      }
      // Los que no están dados de baja van primero
      return aHasBaja ? 1 : -1;
    });
  }, [rawUsers])
  const changeUserPasswordModal = useModal()
  const onClickChangeUserPassword = (user) => {
    setSelectedEntity(user)
    changeUserPasswordModal.open()
  }

  const { 
    mainHeaderProps,
    createModalProps,
    setSelectedEntity,
    deleteModalProps,
    selectedEntity,
    actionColumn,
  } = useCRUDModals("usuario", {
    enableEdit: false,
    withActions: row => <TableActionButton
                          actionIcon={<KeyIcon />} 
                          onClick={() => onClickChangeUserPassword(row)}
                          tooltipText="Cambiar contraseña"
                        />
  })

  const handleOnDelete = () => {
    deleteUser(selectedEntity?.usuario)
  }

  const columns = useMemo(() => {
    const newColumns = [
      {
        name: 'Nombre',
        sortable: true,
        searchable: false,
        selector: row => `${row?.personal?.apellido} ${row?.personal?.nombre}`,
      },
      {
        name: 'Usuario',
        sortable: true,
        searchable: false,
        selector: row => row.usuario,
      },
      {
        name: 'Puesto',
        sortable: true,
        searchable: false,
        selector: row => row.puesto,
      },
      {
        name: 'Perfil',
        sortable: true,
        searchable: false,
        selector: row => row?.perfil?.nombre,
      },
      {
        name: 'Fecha Baja',
        sortable: true,
        searchable: false,
        selector: row => row.fechaBaja,
      },
      actionColumn
    ];
    return newColumns;
  }, [users]); 

  return (
  <Container>
    <div className="shadow rounded-lg bg-white p-2 md:p-4">
      <MainHeader mainTitle="Usuarios" {...mainHeaderProps} />
      <hr/>
      <div className="py-8 md:py-16">
        <Table
          className="shadow"
          columns={columns}
          data={users}
          striped
          responsive
          pagination paginationRowsPerPageOptions={[5, 10, 25, 50, 100]}
          conditionalRowStyles={[
            {
              when: row => row.fechaBaja !== "0000-00-00",
              style: { color: 'gray' },
            },
          ]}
        />
      </div>
    </div>
    <ModalCreateUser {...createModalProps} />
    <ModalChangeUserPassword user={selectedEntity} {...changeUserPasswordModal} />
    <GenericModalDelete onDelete={handleOnDelete} label={selectedEntity?.personal?.nombre} {...deleteModalProps}/>
  </Container>
  )
}

