import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type = "text",
      label,
      id,
      name,
      value,
      onChange,
      placeholder = "",
      className = "",
      error,
      required = false,
      disabled = false,
      helperText,
      fullWidth = true,
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={`mb-4 ${fullWidth ? "w-full" : ""}`}>
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <input
          ref={ref}
          type={type}
          id={inputId}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          className={`
          px-3 py-2 bg-white border shadow-sm border-gray-300 
          placeholder-gray-400 focus:outline-none focus:border-primary-500 
          focus:ring-primary-500 block w-full rounded-md sm:text-sm focus:ring-1
          ${error ? "border-red-500" : ""}
          ${disabled ? "bg-gray-100 cursor-not-allowed" : ""}
          ${className}
        `}
          {...props}
        />
        {helperText && !error && (
          <p className="mt-1 text-sm text-gray-500">{helperText}</p>
        )}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
