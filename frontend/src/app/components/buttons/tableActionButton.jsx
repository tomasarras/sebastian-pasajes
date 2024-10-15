import React from 'react';
import { Tooltip } from 'react-tooltip';

export default function TableActionButton({ actionIcon, onClick, tooltipText }) {
  return (
    <>
      <button
        onClick={onClick}
        className="p-1 mx-1 transform hover:scale-110"
        data-tooltip-id="my-tooltip" 
        data-tooltip-content={tooltipText}
      >
        {actionIcon}
      </button>
      <Tooltip id="my-tooltip" place="bottom" effect="solid" />
    </>
  );
}