"use client"

import { useField } from 'formik';
import Input from "./input/input"
import CommonLabel from '../commonLabel';

export default function FormikStyledField({ className, disableLabel = false, label, type = "text", ...props }) {
  const [field, meta, helpers] = useField(props);


  return <div className={className}>
    {!disableLabel &&
      <CommonLabel htmlFor={props.name}>{label}</CommonLabel>
    }
    <Input id={props.name} error={meta.error} type={type} placeholder={label} {...props} {...field} />

    {meta.touched && meta.error ? (
      <div className="text-red-500">{meta.error}</div>
    ) : null}
  </div>
}
