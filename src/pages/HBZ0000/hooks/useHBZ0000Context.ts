import { useCallback, useContext, useMemo } from "react";
import { HBZ0000Context } from "../context";
import { IHBZ0000Context } from "../interface";

const useHBZ0000Context = () => {
  const { rows, ...context } = useContext(HBZ0000Context) ?? ({} as IHBZ0000Context);
  const headerRow = useMemo(() => {
    if (rows.length === 0) {
      return undefined;
    }

    return rows[0].map((cell) => cell.toString() || "");
  }, []);
  const contentRows = useMemo(() => {
    if (rows.length <= 1) {
      return [];
    }

    return rows.slice(1);
  }, [rows]);

  const getHeaderByColumnIndex = useCallback(
    (index: number) => {
      if (!headerRow) {
        return undefined;
      }

      return headerRow[index];
    },
    [headerRow],
  );

  if (!context) {
    throw new Error("useHBZ0000Context must be used within a HBZ0000Provider");
  }

  return { contentRows, headerRow, rows, getHeaderByColumnIndex, ...context };
};

export default useHBZ0000Context;
