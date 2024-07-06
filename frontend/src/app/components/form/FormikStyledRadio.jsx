"use client"

import { useField } from 'formik';
import CommonLabel from '../commonLabel';

export default function FormikStyledRadio({ options, className, disableLabel = false, label, type = "text", ...props }) {
  const [field, meta, helpers] = useField(props);

  return <div className={`${className}`}>
    {!disableLabel &&
      <CommonLabel htmlFor={props.name}>{label}</CommonLabel>
    }
    <div className='flex'>
      {options.map((option, i) => (
        <div key={option.value} className={`${field.value == option.value ? "bg-primary-500" : props.disabled ? "bg-gray-300" : ""} ${i == 0 ? "border-s rounded-s" : i == (options.length -1) ? "border-e rounded-e" : ""} px-2 py-2 ${props.disabled ? "cursor-not-allowed" : "cursor-pointer"} border-gray-200 border-t border-b`}>
          <label className={`${props.disabled ? "cursor-not-allowed" : "cursor-pointer"} text-black`}>
            {option.label}
            <input
              disabled={props.disabled}
              {...field}
              className='hidden'
              id={option.value}
              value={option.value}
              name={props.name}
              type="radio"
            />
          </label>
        </div>)
      )}
    </div>

    {meta.error ? (
      <div className="text-red-500">{meta.error}</div>
    ) : null}
  </div>
}
