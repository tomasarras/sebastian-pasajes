"use client"

import { useField } from 'formik';
import Input from "./input/input"
import CommonLabel from '../commonLabel';
import DatePicker from "./input/date/DatePicker";
import { useState } from 'react'; 
import { datePickerDateToString } from '@/app/utils/utils';

export default function FormikStyledDate({ className, disableLabel = false, label, type = "text", ...props }) {
  const [field, meta, helpers] = useField(props);
  const [v, setV] = useState(null)

  const handleOnChange = (date) => {    
    setV(date)
    const dateToForkik = datePickerDateToString(date)
    helpers.setValue(dateToForkik)
  }


  return <div className={className}>
    {!disableLabel &&
      <CommonLabel htmlFor={props.name}>{label}</CommonLabel>
    }
    <DatePicker
      id={props.name}
      name={props.name}
      error={meta.error}
      value={v}
      onChange={handleOnChange}
      inputPlaceholder="Seleccionar fecha"
    />

    {meta.touched && meta.error ? (
      <div className="text-red-500">{meta.error}</div>
    ) : null}
  </div>
}
