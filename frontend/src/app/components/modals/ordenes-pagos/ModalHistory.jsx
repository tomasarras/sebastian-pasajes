import React, { useEffect, useState } from 'react';
import Modal from '../modal';
import { formatDate } from '@/app/utils/utils';
import * as isoNcsService from '../../../services/ordenes-pagos/iso/isoNcsService'
import Table from '../../table';

const ModalHistory = ({ action, ...props }) => {
  const [history, setHistory] = useState([]);

  const fetchData = async () => {
    if (action?.id) {
      const data = await isoNcsService.getById(action.id)
      setHistory(data)
    }
  }

  useEffect(() => {
    fetchData()
  }, [action])

  const columns = [
    {
      name: 'Fecha',
      selector: row => formatDate(row.fecha),
      sortable: true,
    },
    {
      name: 'NC',
      selector: row => row.isoNc?.nroNC,
      sortable: true,
    },
    {
      name: 'Cambio',
      selector: row => row.cambio?.nombre,
      sortable: true,
    },
    {
      name: 'Usuario',
      selector: row => `${row.usuario?.personal?.apellido} ${row.usuario?.personal?.nombre}`,
      sortable: true,
    },
  ];

  return (
    <Modal 
      title={`Historial de la acción #${action?.nroNC}`}
      {...props}
    >
      <div className="p-4">        
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-medium">Fecha de creación</p>
              <p>{formatDate(action?.fecha)}</p>
            </div>
            <div>
              <p className="font-medium">Tipo</p>
              <p>{action?.tipo?.nombre}</p>
            </div>
            <div>
              <p className="font-medium">Responsable</p>
              <p>{`${action?.det?.apellido} ${action?.det?.nombre}`}</p>
            </div>
            <div>
              <p className="font-medium">Estado</p>
              <p>{action?.estado?.nombre}</p>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Fechas importantes</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Implementación de Acción</p>
                <p>{formatDate(action?.fechaA) || 'No registrada'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Verificación de Acción</p>
                <p>{formatDate(action?.fechaVA) || 'No registrada'}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Verificación de Eficacia</p>
                <p>{formatDate(action?.fechaVEF) || 'No registrada'}</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h4 className="font-medium mb-2">Historial de cambios</h4>
            <Table
              columns={columns}
              data={history}
              pagination
              paginationRowsPerPageOptions={[5, 10, 25]}
              paginationPerPage={5}
              noDataComponent="No hay registros de historial"
            />
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ModalHistory; 