import { ChangeEvent, HTMLInputTypeAttribute } from "react";

type InputProp = {
  type: HTMLInputTypeAttribute;
  required?: boolean;
  name: string;
  label: string;
  disabled?: boolean;
  placeholder?: string;
  value?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  accept?: string;
};

const Input = ({
  name,
  label,
  type,
  required = false,
  disabled = false,
  accept,
  value,
  onChange,
  placeholder,
}: InputProp) => {
  return (
    <div className="my-6">
      <label
        htmlFor={name}
        className="block text-sm font-medium leading-6 text-gray-900"
      >
        {label}
      </label>
      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type}
          value={value}
          accept={accept}
          disabled={disabled}
          autoComplete={name}
          required={required}
          placeholder={placeholder}
          onChange={onChange}
          className="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default Input;
