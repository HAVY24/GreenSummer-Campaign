import React from "react";

const variants = {
  primary: "bg-primary-600 hover:bg-primary-700 text-white",
  secondary: "bg-secondary-500 hover:bg-secondary-600 text-white",
  success: "bg-green-600 hover:bg-green-700 text-white",
  danger: "bg-red-600 hover:bg-red-700 text-white",
  warning: "bg-yellow-500 hover:bg-yellow-600 text-white",
  info: "bg-blue-500 hover:bg-blue-600 text-white",
  light: "bg-gray-200 hover:bg-gray-300 text-gray-800",
  dark: "bg-gray-800 hover:bg-gray-900 text-white",
  outline:
    "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-800",
  link: "bg-transparent text-primary-600 hover:text-primary-800 underline",
};

const sizes = {
  sm: "py-1 px-2 text-sm",
  md: "py-2 px-4 text-base",
  lg: "py-3 px-6 text-lg",
};

const Button = ({
  children,
  type = "button",
  variant = "primary",
  size = "md",
  className = "",
  disabled = false,
  fullWidth = false,
  onClick,
  ...props
}) => {
  return (
    <button
      type={type}
      className={`
        ${variants[variant]} 
        ${sizes[size]} 
        ${fullWidth ? "w-full" : ""}
        rounded-md font-medium transition-colors duration-200
        focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500
        ${disabled ? "opacity-60 cursor-not-allowed" : ""}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
