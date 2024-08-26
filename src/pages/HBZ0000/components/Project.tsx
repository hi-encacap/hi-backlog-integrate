import { ChangeEvent, useCallback, useMemo } from "react";

import useHBZ0000Context from "../hooks/useHBZ0000Context";

const Project = () => {
  const { project, projects, onChangeProject } = useHBZ0000Context();
  const projectOptions = useMemo(
    () => [
      { value: "", label: "Select project" },
      ...projects.map((project) => ({ value: project.id, label: project.name })),
    ],
    [projects],
  );

  const handleChangeProject = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      const selectedProject = projects.find((project) => project.id === Number(event.target.value));
      if (selectedProject) {
        onChangeProject(selectedProject);
      }
    },
    [projects, onChangeProject],
  );

  return (
    <div>
      <div>
        <span>Project:</span>
        <select value={project?.id} onChange={handleChangeProject}>
          {projectOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default Project;
