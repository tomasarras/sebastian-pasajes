import React, { useState, useEffect } from "react";
import Table from "../index"
import ExportToExcelButton from "../../buttons/exportToExcelButton";

const OrdenesPagosTable = ({ ...props }) => {

  const customStyles = {}
  if (props.onRowClicked) {
    customStyles.rows = {
      style: {
        cursor: "pointer",
        "&:hover": { backgroundColor: "#f0f0f0" }
      }
    }
  }
  
  return (
    <Table customStyles={customStyles} {...props} withExport conditionalRowStyles={[
      {
        when: row => row.fechaBaja && row.fechaBaja !== "0000-00-00",
        style: { color: 'gray' },
      },
    ]}/>
  );
};

export default OrdenesPagosTable;
