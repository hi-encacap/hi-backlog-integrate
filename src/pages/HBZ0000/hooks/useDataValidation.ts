import { useCallback, useMemo } from "react";

import { BacklogBuiltinField, BacklogCustomField } from "@/constants/nulab-api";

import useHBZ0000Context from "./useHBZ0000Context";
import useProjectData from "./useProjectData";

const useDataValidation = () => {
  const { contentRows, headerRow } = useHBZ0000Context();

  const projectData = useProjectData();

  const columnIndexes = useMemo(() => {
    const indexes: Record<string, number> = {};

    headerRow!.forEach((cell, index) => {
      const builtinFields = Object.values(BacklogBuiltinField);
      const customFields = Object.values(BacklogCustomField);

      if (builtinFields.includes(cell.toString() as BacklogBuiltinField)) {
        indexes[cell.toString()] = index;
      } else if (customFields.includes(cell.toString() as BacklogCustomField)) {
        indexes[cell.toString()] = index;
      }
    });

    return indexes;
  }, [headerRow]);

  const invalidFields = useMemo(() => {
    const result = {} as Record<BacklogBuiltinField | BacklogCustomField, [number, number]>;

    contentRows.forEach((row, rowIndex) => {
      Object.entries(columnIndexes).forEach(([fieldName, columnIndex]) => {
        const fieldValue = row[columnIndex].toString();
        const projectFieldData = projectData[fieldName as BacklogBuiltinField | BacklogCustomField];

        if (!projectFieldData) {
          return;
        }

        const projectFieldValues = projectFieldData.map((field) => field.name);

        if (projectFieldValues.length && !projectFieldValues.includes(fieldValue)) {
          const prev = result[fieldName as BacklogBuiltinField | BacklogCustomField] || [];
          // @ts-ignore TS can't infer the type of result
          result[fieldName as BacklogBuiltinField | BacklogCustomField] = [...prev, [rowIndex, columnIndex]];
        }
      });
    });

    return result;
  }, []);

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

  return { invalidFields, invalidRows, validRows, checkInvalidRow, checkInvalidColumn };
};

export default useDataValidation;
