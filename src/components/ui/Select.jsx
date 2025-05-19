import React from "react";
import { forwardRef } from "react";

const Select = forwardRef(({ label, error, children, ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && <label className="block font-medium">{label}</label>}
      <select
        ref={ref}
        {...props}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300 focus:ring-blue-500"
        }`}
      >
        {children}
      </select>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
});

Select.displayName = "Select";

export default Select;
