import { ChangeEvent, useCallback } from "react";
import readXlsxFile from "read-excel-file";

import useHBZ0000Context from "../hooks/useHBZ0000Context";

const Reader = () => {
  const { onChangeRows } = useHBZ0000Context();

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        readXlsxFile(file).then((rows) => {
          const filteredRows = rows.filter((row) => row.some((cell) => cell));

          if (filteredRows.length === 0) {
            return;
          }

          const headerRow = filteredRows[0];
          const contentRows = filteredRows.slice(1);

          if (headerRow.length === 0) {
            return;
          }

          const validHeaderColumnIndexes = headerRow
            .map((cell, index) => (cell ? index : -1))
            .filter((index) => index !== -1);
          const validHeaderRow = headerRow.filter((_, index) => validHeaderColumnIndexes.includes(index));
          const validContentRows = contentRows
            .map((row) => row.filter((_, index) => validHeaderColumnIndexes.includes(index)))
            // With valid column, but it empty, it will be "-".
            .map((row) => row.map((cell) => cell || "-"));

          onChangeRows([validHeaderRow, ...validContentRows]);
        });
      }
    },
    [onChangeRows],
  );

  return <input accept=".xlsx" type="file" onChange={handleFileChange} />;
};

export default Reader;
