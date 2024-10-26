"use client"

export default function Input({ className, error, innerRef, textarea = false, ...props }) {

  const inputOrTextAreaProps = {
    ref: innerRef,
    className: `disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none ${error ? "border-red-500" : "border-gray-300"} bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${className}
    disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-900  disabled:cursor-not-allowed`,
    ...props
  }

  return textarea 
    ? <textarea {...inputOrTextAreaProps}/>
    : <input {...inputOrTextAreaProps}/>
}
