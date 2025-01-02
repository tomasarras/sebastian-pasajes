import React, { useState, useEffect } from "react";
import FilterItem from "../chips/FilterItem";

const TableFilters = ({ filters, setFilters, ...props }) => {
  const clear = (key) => {
    let newFilters = {}
    Object.keys(filters).filter(k => key != k).forEach(k => {
      newFilters[k] = filters[k]
    })
    if (Object.keys(newFilters).length == 0)
      newFilters = null
    setFilters(newFilters);
  } 

  const onClearFilters = () => {
    setFilters(null)
  }

  const render = item => {
    if (typeof item === 'string') {
      return item;
    }
    if (Array.isArray(item)) {
      return item.map(i => render(i)).join(', ');
    }
    if (item && typeof item === 'object' && 'renderValue' in item) {
      return render(item.renderValue);
    }
    return '';
  }

  return filters != null && (
    <div className="bg-white w-full flex justify-end md:p-4">
      {filters && <>
      <div className="flex items-center">
        <div className="font-medium mr-2">Filtrar por:</div>
        <div className="mr-2 flex gap-2">
          {Object.keys(filters).map(key => <FilterItem onClear={() => clear(key)} key={key}>{render(filters[key])}</FilterItem>)}
        </div>
        <span className="text-blue-600 dark:text-blue-500 hover:underline cursor-pointer" onClick={onClearFilters}>Limpiar</span>
      </div>
      </>}
    </div>
  );
};

export default TableFilters;
