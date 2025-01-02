import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import ExportToExcelButton from "../buttons/exportToExcelButton";

const Table = ({ className = "", columns, onChangePage, withExport, onProcessDataToExport, footer, exportFileName, data, ...rest }) => {
  const [dataFiltered, setDataFiltered] = useState(data);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  useEffect(() => {
    setDataFiltered(data)
    setHydrated(true);
  }, [data]);

  if (!hydrated) {
    return null;
  }

  return (
    <div>
      <DataTable
        className={className}
        columns={columns.filter(c => c.hidden == undefined || c.hidden === false)}
        data={dataFiltered}
        noDataComponent={rest.noDataComponent || "No hay datos"}
        onChangePage={onChangePage}
        paginationComponentOptions={{
          rowsPerPageText: "Filas por página:",
          rangeSeparatorText: "de",
          noRowsPerPage: false,
          selectAllRowsItem: false,
          selectAllRowsItemText: "Todo",
        }}
        {...rest}
      />
      <div className="flex justify-end mb-4">
        {footer}
        {withExport && (
          <ExportToExcelButton 
            onProcessDataToExport={onProcessDataToExport}
            data={dataFiltered} 
            columns={columns}
            filename={exportFileName || "archivo"}
          />
        )}
      </div>
    </div>
  );
};

export default Table;
