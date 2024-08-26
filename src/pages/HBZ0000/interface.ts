import { Dispatch, SetStateAction } from "react";
import { Row } from "read-excel-file";

import {
  IBacklogCategory,
  IBacklogCustomField,
  IBacklogIssueType,
  IBacklogMilestone,
  IBacklogProject,
  IUser,
} from "@/interfaces/nulab";

export interface IHBZ0000Context {
  getProjectInfoError: unknown;
  rows: Row[];
  projectCustomFields: IBacklogCustomField[];
  project: IBacklogProject | null;
  projects: IBacklogProject[];
  projectMilestones: IBacklogMilestone[];
  projectUsers: IUser[];
  projectCategories: IBacklogCategory[];
  projectIssueTypes: IBacklogIssueType[];
  projectPriorities: IBacklogIssueType[];
  onChangeRows: Dispatch<SetStateAction<Row[]>>;
  onChangeProject: Dispatch<SetStateAction<IBacklogProject | null>>;
}
