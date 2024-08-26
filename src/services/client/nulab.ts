import {
  IBacklogCategory,
  IBacklogCustomField,
  IBacklogIssueCreationBody,
  IBacklogIssueType,
  IBacklogMilestone,
  IUser,
} from "@/interfaces/nulab";
import nulabRequestClient from "@/utils/axios/nulabClient";

const getBacklogProjectUsers = async (projectId: number) => {
  const response = await nulabRequestClient.get<IUser[]>(`api/v2/projects/${projectId}/users`);

  return response.data.data;
};

const getBacklogProjectCategories = async (projectId: number) => {
  const response = await nulabRequestClient.get<IBacklogCategory[]>(
    `api/v2/projects/${projectId}/categories`,
  );

  return response.data.data;
};

const getBacklogProjectMilestones = async (projectId: number) => {
  const response = await nulabRequestClient.get<IBacklogMilestone[]>(`api/v2/projects/${projectId}/versions`);

  return response.data.data;
};

const getBacklogCustomFields = async (projectId: number) => {
  const response = await nulabRequestClient.get<IBacklogCustomField[]>(
    `api/v2/projects/${projectId}/customFields`,
  );

  return response.data.data;
};

const createBacklogIssue = async (issue: IBacklogIssueCreationBody) => {
  const response = await nulabRequestClient.post<IBacklogIssueCreationBody>("api/v2/issues", issue, {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  return response.data.data;
};

const getBacklogProjectIssueTypes = async (projectId: number) => {
  const response = await nulabRequestClient.get<IBacklogIssueType[]>(
    `api/v2/projects/${projectId}/issueTypes`,
  );

  return response.data.data;
};

const getBacklogPriorities = async () => {
  const response = await nulabRequestClient.get<IBacklogIssueType[]>(`api/v2/priorities`);

  return response.data.data;
};

export {
  createBacklogIssue,
  getBacklogCustomFields,
  getBacklogPriorities,
  getBacklogProjectCategories,
  getBacklogProjectIssueTypes,
  getBacklogProjectMilestones,
  getBacklogProjectUsers,
};
