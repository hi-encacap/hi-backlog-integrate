export interface IUser {
  id: number;
  name: string;
}

export interface IBacklogProject {
  id: number;
  name: string;
  projectKey: string;
}

export interface IBacklogCategory {
  id: number;
  name: string;
}

export interface IBacklogMilestone {
  id: number;
  name: string;
}

export interface IBacklogCustomFieldItem {
  id: number;
  name: string;
  fieldId: number;
}

export interface IBacklogCustomField {
  id: number;
  name: string;
  items?: IBacklogCustomFieldItem[];
}

export interface IBacklogIssueType {
  id: number;
  name: string;
}

export interface IBacklogIssueCreationBody {
  projectId: number;
  summary: string;
  issueTypeId: number;
  priorityId: number;
  assigneeId?: number;
  categoryId?: number;
  milestoneId?: number;
  customFields?: Record<string, string>;
}
