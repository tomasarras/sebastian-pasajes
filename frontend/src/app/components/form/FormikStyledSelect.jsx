"use client"

import { useField } from 'formik';
import Select from "./select/select"
import CommonLabel from '../commonLabel';

export default function FormikStyledSelect({ className, label, onChange = () => {}, disableLabel = false, ...props }) {
  const [field, meta, helpers] = useField(props);

  const handleOnChange = (newValue) => {
    onChange(newValue.target.value)
    field.onChange(newValue)
  }

  return <div className={className}>
    {!disableLabel &&
      <CommonLabel htmlFor={props.name}>{label}</CommonLabel>
    }
    <Select id={props.name} {...field} onChange={handleOnChange} {...props} />

    {meta.touched && meta.error ? (
      <div className="text-red-500">{meta.error}</div>
    ) : null}
  </div>
}
