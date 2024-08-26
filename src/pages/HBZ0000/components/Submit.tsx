import { useCallback, useState } from "react";

import { BacklogBuiltinField, BacklogCustomField } from "@/constants/nulab-api";
import { IBacklogIssueCreationBody } from "@/interfaces/nulab";
import { nulabService } from "@/services/client";

import useDataValidation from "../hooks/useDataValidation";
import useHBZ0000Context from "../hooks/useHBZ0000Context";
import useKeyMapping from "../hooks/useKeyMapping";
import useProjectData from "../hooks/useProjectData";

const Submit = () => {
  const { project, rows, getHeaderByColumnIndex, projectPriorities, projectIssueTypes } = useHBZ0000Context();
  const { validRows } = useDataValidation();
  const { getKeyByHeader, getValueByKey } = useKeyMapping();
  const projectData = useProjectData();

  const [isLoading, setIsLoading] = useState(false);
  const [createError, setCreateError] = useState<Error | null>(null);
  const [isFinished, setIsFinished] = useState(false);

  const generateIssues = useCallback(() => {
    const issues: IBacklogIssueCreationBody[] = [];

    validRows.forEach((row) => {
      const builtinFields = Object.values(BacklogBuiltinField);
      const customFields = Object.values(BacklogCustomField);
      const issue: Record<string, unknown> = {
        projectId: project!.id,
        issueTypeId: projectIssueTypes[0].id,
        priorityId: projectPriorities[0].id,
        summary: "",
      };

      row.forEach((cell, index) => {
        const header = getHeaderByColumnIndex(index);
        const headerMapping = getKeyByHeader(getHeaderByColumnIndex(index)!.toString());
        const headerMappingKey = headerMapping?.key;

        if (headerMappingKey && builtinFields.includes(header as BacklogBuiltinField)) {
          const cellProjectData = projectData[header as BacklogBuiltinField];
          const cellData = cellProjectData.find((item) => item.name === cell.toString());
          if (cellData) {
            issue[headerMappingKey] = getValueByKey(
              headerMapping,
              cellData as unknown as Record<string, unknown>,
            );
          } else {
            issue[headerMappingKey] = cell.toString();
          }
        } else if (customFields.includes(header as BacklogCustomField)) {
          const customField = projectData[header as BacklogCustomField].find(
            (item) => item.name === cell.toString(),
          );
          if (customField) {
            issue[`customField_${customField.fieldId}`] = customField.id;
          }
        }
      });

      issues.push(issue as unknown as IBacklogIssueCreationBody);
    });

    return issues;
  }, [validRows, project, projectData, projectIssueTypes, projectPriorities]);

  const createIssues = useCallback(async () => {
    setIsLoading(true);

    const issues = generateIssues();

    try {
      await Promise.all(issues.map(nulabService.createBacklogIssue));
      setIsFinished(true);
    } catch (error) {
      setCreateError(error as Error);
    } finally {
      setIsLoading(false);
    }
  }, [generateIssues]);

  return (
    <div>
      {isFinished && createError === null && <div>Issues created successfully</div>}
      {createError && <div>Error occurred: {createError.message}</div>}
      <button disabled={isLoading} type="button" onClick={createIssues}>
        Create {validRows.length} issues ({rows.length - 1 - validRows.length} invalid rows will be ignored)
      </button>
    </div>
  );
};

export default Submit;
