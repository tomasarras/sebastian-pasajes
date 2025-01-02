import React from 'react';
import Modal from '../modal';
import PrimaryButton from '../../buttons/ordenes-pago/primaryButton';

const ModalNotify = ({ onNotify, ...props }) => {
  return (
    <Modal 
      title="Notificar" 
      {...props}
    >
      <div className="p-4">
        <p className="text-lg mb-6">¿Desea notificar a los participantes?</p>
        
        <div className="flex justify-end gap-4">
          <PrimaryButton
            outline
            actionText="Cancelar"
            onClick={props.close}
            className="bg-gray-500 hover:bg-gray-600 min-w-24"
          />
          <PrimaryButton
            actionText="Notificar"
            onClick={() => {
              onNotify();
              props.close();
            }}
            className="bg-blue-600 hover:bg-blue-700 min-w-24"
          />
        </div>
      </div>
    </Modal>
  );
};

export default ModalNotify; 