import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import useDataValidation from "../hooks/useDataValidation";
import useHBZ0000Context from "../hooks/useHBZ0000Context";

const Review = () => {
  const { rows } = useHBZ0000Context();
  const { checkInvalidColumn, checkInvalidRow } = useDataValidation();

  const headerRow = useMemo(() => rows[0], [rows]);
  const contentRows = useMemo(() => rows.slice(1), [rows]);

  return (
    <div>
      <table className="w-full">
        <thead>
          <tr>
            <th>Row</th>
            {headerRow.map((cell, index) => (
              <th className="text-left" key={index}>
                {cell.toString()}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {contentRows.map((row, index) => (
            <tr key={index} className={twMerge(checkInvalidRow(index) && "bg-red-100")}>
              <td className="text-center">{index + 2}</td>
              {row.map((cell, cellIndex) => (
                <td
                  className={twMerge("text-left", checkInvalidColumn(index, cellIndex) && "text-red-500")}
                  key={cellIndex}
                >
                  {cell.toString()}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Review;
