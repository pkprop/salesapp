import { ComponentProps } from 'react';

interface TextInputProps extends ComponentProps<'textarea'> {
  error?: string;
  placeholder?:string;
}

export default function TextBoxInput({
  name,
  className,
  error,
  placeholder,
  ...props
}: TextInputProps) {
  return (
    <>
      <textarea
        id={name}
        name={name}
        placeholder={placeholder}
        {...props}
        className={`form-input w-full focus:outline-none focus:ring-1 focus:ring-indigo-400 focus:border-indigo-400 border-gray-300 rounded ${
          error ? 'border-red-400 focus:border-red-400 focus:ring-red-400' : ''
        } ${className}`}
      ></textarea>
      {error && <span className="text-red-500">{error}</span>}
    </>
    
  );
}
