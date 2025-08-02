import { ComponentProps } from 'react';

interface SelectInputProps extends ComponentProps<'select'> {
  error?: string;
  selected?: string;
  value?: string;
  options: { value: string; label: string }[];
}

export default function SelectInput({
  name,
  error,
  className,
  selected,
  value,
  options = [],
  ...props
}: SelectInputProps) {
  return (
    <select
      id={name}
      name={name}
      {...props}
      className={`${className} form-select w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
        error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
      }`}
       defaultValue={value}
    >
      
        <option key={'blank'} value={''}>
          Select a Value
        </option>
        
      {options?.map(({ value, label }, index) => (
        <option key={index} value={value}>
          {label}
        </option>
      ))}
    </select>
  );
}
