import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';

const FilterItem = ({ children, onClear }) => {
  return (
    <div className='flex rounded-2xl bg-primary-900 h-9 px-4 py-2 items-center'><ClearIcon onClick={onClear} className='cursor-pointer mr-1 h-4 w-4'/>{children}</div>
  )
}

export default FilterItem 