import React, { useState } from 'react';
import FormikStyledField from "../form/FormikStyledField";
import CommonLabel from '../commonLabel';
import Input from '../form/input/input';
import PrimaryButton from '../buttons/ordenes-pago/primaryButton';

const FileUploadSection = ({ onUpload, isVisible }) => {
  const [file, setFile] = useState(null);
  const [observaciones, setObservaciones] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('observaciones', observaciones);
      
      await onUpload(formData);
      
      // Limpiar el formulario después de subir
      setFile(null);
      setObservaciones('');
    } catch (error) {
      console.error('Error al subir el archivo:', error);
    } finally {
      setIsUploading(false);
    }
  };

  if (!isVisible) return null;

  return (
    <div className="mt-4 border-t pt-4">
      <div className="mb-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100"
        />
      </div>
      
      <div className="mb-4">
      <CommonLabel htmlFor="obs">Observaciones del archivo</CommonLabel>
      <Input id="obs" textarea value={observaciones} onChange={(e) => setObservaciones(e.target.value)}/>
      </div>

      <PrimaryButton
        onClick={handleUpload}
        disabled={!file || isUploading}
        actionText={isUploading ? 'Subiendo...' : 'Subir'}
        type="button"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      />
    </div>
  );
};

export default FileUploadSection; 