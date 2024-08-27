import { twMerge } from "tailwind-merge";

import useDataValidation from "../hooks/useDataValidation";
import useHBZ0000Context from "../hooks/useHBZ0000Context";

const Review = () => {
  const { headerRow, contentRows } = useHBZ0000Context();
  const { ignoredFields, checkInvalidColumn, checkInvalidRow, checkIgnoredField } = useDataValidation();

  return (
    <div>
      {ignoredFields.length > 0 && (
        <div className="my-4">
          <p className="text-red-500">
            The following fields are not recognized and will be ignored:
            <span className="mx-1 font-semibold">{ignoredFields.join(", ")}</span>
          </p>
        </div>
      )}
      <table className="w-full">
        <thead>
          <tr>
            <th>Row</th>
            {headerRow!.map((cell, index) => (
              <th
                className={twMerge("text-left", checkIgnoredField(cell.toString()) && "opacity-20")}
                key={index}
              >
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
                  className={twMerge(
                    "text-left",
                    checkInvalidColumn(index, cellIndex) && "text-red-500",
                    checkIgnoredField(cellIndex) && "opacity-20",
                  )}
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
