"use client"

export default function Input({ className, error, innerRef, ...props }) {

  return (
    <input
      ref={innerRef}
      className={`${error ? "border-red-500" : "border-gray-300"} bg-gray-50 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5  ${className}
      disabled:bg-gray-100 disabled:border-gray-300 disabled:text-gray-900  disabled:cursor-not-allowed`}
      {...props}
    />)
}
