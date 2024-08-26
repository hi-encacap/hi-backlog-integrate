import { BacklogBuiltinField } from "@/constants/nulab-api";
import { useCallback, useMemo } from "react";

interface KeyMapping {
  key: string;
  type: string;
  path: string;
}

const useKeyMapping = () => {
  const keyMapping = useMemo<Record<string, KeyMapping>>(
    () => ({
      [BacklogBuiltinField.ASSIGNEE]: { key: "assigneeId", type: "number", path: "id" },
      [BacklogBuiltinField.CATEGORY]: { key: "categoryId", type: "number[]", path: "id" },
      [BacklogBuiltinField.MILESTONE]: { key: "milestoneId", type: "number[]", path: "id" },
      [BacklogBuiltinField.SUBJECT]: { key: "summary", type: "string", path: "" },
    }),
    [],
  );

  const getKeyByHeader = useCallback(
    (header: string) => {
      const mappingKey = Object.keys(keyMapping).find((key) => key === header);

      return mappingKey ? keyMapping[mappingKey] : null;
    },
    [keyMapping],
  );

  const getValueByKey = useCallback((key: KeyMapping, data: Record<string, unknown>) => {
    const valueType = key.type;

    if (valueType === "number") {
      return Number(data[key.path]);
    } else if (valueType === "number[]") {
      return [Number(data[key.path])];
    }

    return data[key.path];
  }, []);

  return { keyMapping, getKeyByHeader, getValueByKey };
};

export default useKeyMapping;
