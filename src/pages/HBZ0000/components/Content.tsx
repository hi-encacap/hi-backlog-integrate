"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Row } from "read-excel-file";

import { HBZ0000Context } from "../context";

import {
  IBacklogCategory,
  IBacklogCustomField,
  IBacklogIssueType,
  IBacklogMilestone,
  IBacklogProject,
  IUser,
} from "@/interfaces/nulab";
import { nulabService } from "@/services/client";
import Project from "./Project";
import Reader from "./Reader";
import Review from "./Review";
import Submit from "./Submit";

interface ContentProps {
  projects: IBacklogProject[];
}

const Content = ({ projects }: ContentProps) => {
  const [rows, setRows] = useState<Row[]>([]);
  const [project, setProject] = useState<IBacklogProject | null>(null);
  const [projectUsers, setProjectUsers] = useState<IUser[]>([]);
  const [projectCategories, setProjectCategories] = useState<IBacklogCategory[]>([]);
  const [projectMilestones, setProjectMilestones] = useState<IBacklogMilestone[]>([]);
  const [getProjectInfoError, setGetProjectInfoError] = useState<unknown>(null);
  const [projectCustomFields, setProjectCustomFields] = useState<IBacklogCustomField[]>([]);
  const [projectIssueTypes, setProjectIssueTypes] = useState<IBacklogIssueType[]>([]);
  const [projectPriorities, setProjectPriorities] = useState<IBacklogIssueType[]>([]);

  const contextValue = useMemo(
    () => ({
      projectCustomFields,
      projectMilestones,
      getProjectInfoError,
      rows,
      projectCategories,
      project,
      projects,
      projectUsers,
      projectIssueTypes,
      projectPriorities,
      onChangeRows: setRows,
      onChangeProject: setProject,
    }),
    [
      projectMilestones,
      getProjectInfoError,
      rows,
      project,
      projectUsers,
      projectCategories,
      projectCustomFields,
      projectIssueTypes,
      projectPriorities,
      projects,
    ],
  );

  const prepareProjectValidations = useCallback(async () => {
    if (!project) {
      return;
    }

    try {
      const projectUsersResponse = await nulabService.getBacklogProjectUsers(project.id);
      const projectCategoriesResponse = await nulabService.getBacklogProjectCategories(project.id);
      const projectMilestonesResponse = await nulabService.getBacklogProjectMilestones(project.id);
      const projectCustomFieldsResponse = await nulabService.getBacklogCustomFields(project.id);
      const projectIssuesResponse = await nulabService.getBacklogProjectIssueTypes(project.id);
      const projectPrioritiesResponse = await nulabService.getBacklogPriorities();

      setProjectUsers(projectUsersResponse);
      setProjectCategories(projectCategoriesResponse);
      setProjectMilestones(projectMilestonesResponse);
      setProjectCustomFields(projectCustomFieldsResponse);
      setProjectIssueTypes(projectIssuesResponse);
      setProjectPriorities(projectPrioritiesResponse);
    } catch (error) {
      setGetProjectInfoError(error);
    }
  }, [project]);

  useEffect(() => {
    prepareProjectValidations();
  }, [prepareProjectValidations]);

  return (
    <HBZ0000Context.Provider value={contextValue}>
      <Project />
      {project && (
        <>
          <Reader />
          {rows.length > 1 && (
            <>
              <Review />
              <Submit />
            </>
          )}
        </>
      )}
    </HBZ0000Context.Provider>
  );
};

export default Content;
