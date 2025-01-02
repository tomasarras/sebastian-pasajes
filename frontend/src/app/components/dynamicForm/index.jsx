import React, { useEffect } from 'react';
import Select from '../form/select/select';
import Input from '../form/input/input';
import DateRangePicker from '../form/input/date/DatePicker';

const DynamicForm = ({ fields }) => {
  const handleChange = (e, onChange) => {
    const { name, value, type, checked } = e.target;
    onChange(type === 'checkbox' ? checked : value, name);
  };

  useEffect(() => {
    console.log(fields)
  }, [fields])

  useEffect(() => {
    console.log(fields)
  }, [])

  return (
    <form>
      {fields?.map((field, index) => {
        const { type, value, label, options, onChange, name } = field;

        return (
          <div key={index} style={{ marginBottom: '1rem' }}>
            {label && <label htmlFor={name}>{label}</label>}
            {type === 'input' && (
              <Input
                type="text"
                id={name}
                textarea={false}
                name={name}
                value={value}
                onChange={(e) => handleChange(e, onChange)}
              />
            )}
            {type === 'textArea' && (
              <Input
                type="text"
                id={name}
                textarea={true}
                name={name}
                value={value}
                onChange={(e) => handleChange(e, onChange)}
              />
            )}
            {type === 'select' && (
              <Select
                id={name}
                name={name}
                value={value}
                onChange={(e) => handleChange(e, onChange)}
                options={options}
              >
              </Select>
            )}
            {type === 'checkbox' && (
              <input
                type="checkbox"
                id={name}
                name={name}
                checked={value}
                onChange={(e) => handleChange(e, onChange)}
              />
            )}
            {type === 'date' && (
              <DateRangePicker
                calendar
                value={value}
                onChange={(e) => handleChange(e, onChange)}
                inputPlaceholder={label} 
              />
            )}
          </div>
        );
      })}
    </form>
  );
};

export default DynamicForm;
