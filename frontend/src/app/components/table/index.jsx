import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";

const Table = ({ className = "", columns, onChangePage, data, ...rest }) => {
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
        columns={columns}
        data={dataFiltered}
        noDataComponent="No hay datos"
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
    </div>
  );
};

export default Table;
