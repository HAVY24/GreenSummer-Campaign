import React from "react";

const Table = ({
  columns,
  data,
  className = "",
  striped = true,
  hoverable = true,
  bordered = false,
  compact = false,
  emptyMessage = "Không có dữ liệu",
  isLoading = false,
}) => {
  const renderCell = (item, column) => {
    if (column.render) {
      return column.render(item);
    }

    return item[column.key];
  };

  return (
    <div className="w-full overflow-x-auto">
      <table className={`min-w-full divide-y divide-gray-200 ${className}`}>
        <thead className="bg-gray-50">
          <tr>
            {columns.map((column, index) => (
              <th
                key={index}
                scope="col"
                className={`
                  px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider
                  ${column.className || ""}
                `}
                style={column.width ? { width: column.width } : {}}
              >
                {column.title}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                Đang tải dữ liệu...
              </td>
            </tr>
          ) : data && data.length > 0 ? (
            data.map((item, rowIndex) => (
              <tr
                key={item.id || rowIndex}
                className={`
                  ${striped && rowIndex % 2 === 1 ? "bg-gray-50" : ""}
                  ${hoverable ? "hover:bg-gray-100" : ""}
                  ${bordered ? "border-b border-gray-200" : ""}
                `}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={`${rowIndex}-${colIndex}`}
                    className={`px-6 py-4 whitespace-nowrap text-sm text-gray-500 ${
                      compact ? "py-2" : ""
                    }`}
                  >
                    {renderCell(item, column)}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="px-6 py-4 text-center text-sm text-gray-500"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
