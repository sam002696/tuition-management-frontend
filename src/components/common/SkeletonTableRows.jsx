import React from "react";

const SkeletonTableRows = ({ columns, rowCount = 5 }) => {
  return Array.from({ length: rowCount }).map((_, rowIndex) => (
    <tr key={rowIndex}>
      {columns.map((col) => (
        <td
          key={col.key}
          className={`px-3 py-4 text-sm whitespace-nowrap ${
            col.alignRight ? "text-right" : ""
          }`}
        >
          <div className="h-4 bg-gray-200 rounded animate-pulse w-full" />
        </td>
      ))}
    </tr>
  ));
};

export default SkeletonTableRows;
