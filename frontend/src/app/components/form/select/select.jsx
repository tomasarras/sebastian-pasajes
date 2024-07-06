"use client"

export default function Select({ options, placeholder, getOptionLabel, ...props }) {

  if (typeof getOptionLabel == 'function') {
    options = options.map(item => {
      item.label = getOptionLabel(item)
      return item
    })
  }

  return (
    <select 
      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5
      disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-900  disabled:cursor-not-allowed"
      {...props}
    >
      {placeholder !== undefined && <option value={"no-selected"}>{placeholder}</option>}
      {options.map((option, i) => 
        <option key={i} value={option.value}>{option.label}</option>
      )}
    </select>)
}
