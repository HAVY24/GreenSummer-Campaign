import React from "react";

const Card = ({
  children,
  title,
  className = "",
  headerClassName = "",
  bodyClassName = "",
  footerClassName = "",
  footer,
  border = true,
  shadow = true,
  ...props
}) => {
  return (
    <div
      className={`
        bg-white rounded-lg 
        ${border ? "border border-gray-200" : ""} 
        ${shadow ? "shadow-sm" : ""}
        ${className}
      `}
      {...props}
    >
      {title && (
        <div className={`p-4 border-b border-gray-200 ${headerClassName}`}>
          {typeof title === "string" ? (
            <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          ) : (
            title
          )}
        </div>
      )}
      <div className={`p-4 ${bodyClassName}`}>{children}</div>
      {footer && (
        <div className={`p-4 border-t border-gray-200 ${footerClassName}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
