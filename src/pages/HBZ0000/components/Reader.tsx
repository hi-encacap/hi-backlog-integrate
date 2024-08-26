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
          onChangeRows(rows);
        });
      }
    },
    [onChangeRows],
  );

  return <input accept=".xlsx" type="file" onChange={handleFileChange} />;
};

export default Reader;
