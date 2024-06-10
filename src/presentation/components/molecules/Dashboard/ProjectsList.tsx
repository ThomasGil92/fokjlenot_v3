import { CardContent } from "@/presentation/shadcn/components/ui/card";
import ProjectsListItem from "../../atoms/Dashboard/ProjectsListItem";

import { Project } from "@/adapters/secondary/project/project";
import AddProjectFormFields from "./AddProjectFormFields";


interface ProjectListProp {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectListProp> = ({ projects }) => {

  return (
    <CardContent>
    <AddProjectFormFields />
      {projects.length > 0 &&
        projects.map((project) => (
          <div
            key={project.id + project.title + "ProjectListItem"}
            className='group flex flex-col gap-4 py-2'
          >
            <ProjectsListItem {...project} />
          </div>
        ))}
    </CardContent>
  );
};
export default ProjectsList;
