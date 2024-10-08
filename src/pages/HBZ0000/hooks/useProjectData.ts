import { useMemo } from "react";

import { BacklogBuiltinField } from "@/constants/nulab-api";
import { IBacklogCustomFieldItem } from "@/interfaces/nulab";

import useHBZ0000Context from "./useHBZ0000Context";

const useProjectData = () => {
  const {
    projectUsers,
    projectCategories,
    projectMilestones,
    projectCustomFields: customFields,
  } = useHBZ0000Context();

  const projectData = useMemo(
    () =>
      ({
        [BacklogBuiltinField.ASSIGNEE]: projectUsers,
        [BacklogBuiltinField.CATEGORY]: projectCategories,
        [BacklogBuiltinField.MILESTONE]: projectMilestones,
        ...customFields.reduce(
          (acc, field) => {
            if (field.items) {
              acc[field.name] = field.items.map((item) => ({
                ...item,
                fieldId: field.id,
              }));
            }

            return acc;
          },
          {} as Record<string, IBacklogCustomFieldItem[]>,
        ),
      }) as unknown as Record<BacklogBuiltinField | string, Array<Record<string, unknown>>>,
    [projectUsers, projectCategories, projectMilestones],
  );

  return projectData;
};

export default useProjectData;
