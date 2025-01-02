import React from 'react';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import * as XLSX from 'xlsx';

const ExportToExcelButton = ({ data, columns, filename = "datos", onProcessDataToExport = false, onClick, title, className }) => {
  const exportToExcel = () => {
    if (data == undefined) {
      onClick()
      return;
    }

    // Filtramos las columnas que no sean de acciones
    const exportColumns = columns.filter(col => col.name !== 'Acciones' && col.noExportableColumn !== true);

    // Preparamos los datos para la exportación
    let excelData = data.map(item => {
      const row = {};
      exportColumns.forEach(col => {
        let value = '';
        if (typeof col.selector === 'function') {
          const selectedValue = col.selector(item);
          // Si el valor es un elemento React, intentamos obtener el texto
          if (React.isValidElement(selectedValue)) {
            // Si tiene children que es un string, lo usamos
            if (typeof selectedValue.props.children === 'string') {
              value = selectedValue.props.children;
            } 
            // Si children es un array, lo unimos
            else if (Array.isArray(selectedValue.props.children)) {
              value = selectedValue.props.children
                .filter(child => typeof child === 'string')
                .join(' ');
            }
            // Si tiene un span con texto dentro
            else if (selectedValue.props.children?.props?.children) {
              value = selectedValue.props.children.props.children;
            }
          } else {
            value = selectedValue;
          }
        } else {
          value = item[col.selector];
        }
        row[col.name] = value || '';
      });
      return row;
    });
    if (onProcessDataToExport)
      excelData = onProcessDataToExport(excelData)
    // Crear el libro de trabajo y la hoja
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Agregar la hoja al libro
    XLSX.utils.book_append_sheet(wb, ws, "Datos");

    // Guardar el archivo
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return (
    <button
      onClick={exportToExcel}
      title={title || "Exportar a Excel"}
      className={`flex items-center p-2 bg-green-600 text-white rounded hover:bg-green-700 ${className}`}
    >
      <FileDownloadIcon />
    </button>
  );
};

export default ExportToExcelButton;
