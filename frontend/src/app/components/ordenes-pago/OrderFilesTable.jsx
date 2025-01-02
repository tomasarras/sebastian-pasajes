import React from 'react';
import Table from '../table';
import DeleteIcon from '@mui/icons-material/Delete';
import TableActionButton from '../buttons/tableActionButton';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import useAuth from '@/app/hooks/ordenes-pagos/useAuth';
import { USER_ROLE } from '@/app/utils/constants';

const OrderFilesTable = ({ files, onDeleteFile, onDownloadFile }) => {
  const userData = useAuth()
  const isAdmin = [USER_ROLE.ADMIN, USER_ROLE.WEBMASTER].includes(userData?.role)
  const columns = [
    {
      name: 'Archivo',
      selector: row => `#${row.id}`,
      sortable: true,
    },
    {
      name: 'Descripción',
      selector: row => row.descripcion,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: row => (<>
        {isAdmin &&
          <TableActionButton 
            actionIcon={<DeleteIcon color="error" />} 
            onClick={() => onDeleteFile(row.id)}
            tooltipText="Eliminar archivo"
          />
        }
        <TableActionButton 
          actionIcon={<FileDownloadIcon />} 
          onClick={() => onDownloadFile(row)}
          tooltipText="Descargar archivo"
        />
      </>),
    }
  ];

  return (
    <div className="mt-4">
      <Table
        columns={columns}
        data={files || []}
        striped
        responsive
        pagination
        paginationRowsPerPageOptions={[5, 10, 25]}
        paginationPerPage={5}
        noDataComponent="No hay archivos"
      />
    </div>
  );
};

export default OrderFilesTable; 