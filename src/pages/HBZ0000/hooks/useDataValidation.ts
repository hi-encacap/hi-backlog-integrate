import { useCallback, useMemo } from "react";

import { BacklogBuiltinField } from "@/constants/nulab-api";

import useHBZ0000Context from "./useHBZ0000Context";
import useProjectData from "./useProjectData";

const useDataValidation = () => {
  const { contentRows, headerRow, projectCustomFields } = useHBZ0000Context();

  const projectData = useProjectData();

  const columnIndexes = useMemo(() => {
    const indexes: Record<string, number> = {};

    headerRow!.forEach((cell, index) => {
      if (!cell) {
        return;
      }

      indexes[cell.toString()] = index;
    });

    return indexes;
  }, [headerRow]);

  const invalidFields = useMemo(() => {
    const result = {} as Record<BacklogBuiltinField | string, [number, number]>;

    contentRows.forEach((row, rowIndex) => {
      Object.entries(columnIndexes).forEach(([fieldName, columnIndex]) => {
        if (!row[columnIndex]) {
          return;
        }

        const fieldValue = row[columnIndex].toString();
        const projectFieldData = projectData[fieldName as BacklogBuiltinField | string];

        if (!projectFieldData) {
          return;
        }

        const projectFieldValues = projectFieldData.map((field) => field.name);

        if (!projectFieldValues.includes(fieldValue)) {
          const prev = result[fieldName as BacklogBuiltinField | string] || [];
          // @ts-ignore TS can't infer the type of result
          result[fieldName as BacklogBuiltinField | string] = [...prev, [rowIndex, columnIndex]];
        }
      });
    });

    return result;
  }, []);

  const ignoredFields = useMemo(() => {
    const customFieldNames = projectCustomFields.map((field) => field.name);
    const builtinFieldNames = Object.values(BacklogBuiltinField);
    const headerFields = headerRow!.map((cell) => cell.toString());

    return headerFields.filter(
      (field) =>
        !customFieldNames.includes(field) && !builtinFieldNames.includes(field as BacklogBuiltinField),
    );
  }, [headerRow, projectCustomFields]);

  const invalidRows = useMemo(() => {
    // @ts-ignore TS can't infer the type of invalidFields
    return Object.values(invalidFields).map((fields) => fields[0][0]);
  }, [invalidFields]);

  const validRows = useMemo(() => {
    return contentRows.filter((_, index) => !invalidRows.includes(index));
  }, [contentRows, invalidRows]);

  const checkInvalidRow = useCallback(
    (rowIndex: number) => {
      return Object.values(invalidFields).some((fields) =>
        // @ts-ignore TS can't infer the type of fields
        fields.some(([invalidRowIndex]) => invalidRowIndex === rowIndex),
      );
    },
    [invalidFields],
  );

  const checkInvalidColumn = useCallback(
    (rowIndex: number, columnIndex: number) => {
      return Object.entries(invalidFields).some(([, fields]) =>
        fields.some(
          // @ts-ignore TS can't infer the type of fields
          ([invalidRowIndex, invalidColumnIndex]) =>
            invalidRowIndex === rowIndex && invalidColumnIndex === columnIndex,
        ),
      );
    },
    [invalidFields],
  );

  const checkIgnoredField = useCallback(
    (field: string | number) => {
      if (typeof field === "number") {
        return ignoredFields.includes(headerRow![field].toString());
      }

      return ignoredFields.includes(field);
    },
    [ignoredFields],
  );

  return {
    invalidFields,
    invalidRows,
    validRows,
    ignoredFields,
    checkIgnoredField,
    checkInvalidRow,
    checkInvalidColumn,
  };
};

export default useDataValidation;
