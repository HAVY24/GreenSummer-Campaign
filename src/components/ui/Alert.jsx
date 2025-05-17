import React from "react";

const variants = {
  success: "bg-green-50 text-green-800 border-green-200",
  error: "bg-red-50 text-red-800 border-red-200",
  errorWhite: "bg-white text-red-500 border border-red-500",
  warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
  info: "bg-blue-50 text-blue-800 border-blue-200",
};


const Alert = ({
  children,
  message,
  variant = "info",
  title,
  className = "",
  onClose,
  ...props
}) => {
  return (
    <div
      className={`p-4 mb-4 border rounded-md ${variants[variant]} ${className}`}
      role="alert"
      {...props}
    >
      <div className="flex items-start">
        <div className="flex-grow">
          {title && <h3 className="font-medium mb-1">{title}</h3>}
          <div className={`${title ? "text-sm" : ""}`}>
            {message || children}
          </div>
        </div>
        {onClose && (
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 rounded-lg focus:ring-2 p-1.5 inline-flex h-8 w-8 hover:bg-gray-200"
            onClick={onClose}
            aria-label="Close"
          >
            <span className="sr-only">Close</span>
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};


export default Alert;
