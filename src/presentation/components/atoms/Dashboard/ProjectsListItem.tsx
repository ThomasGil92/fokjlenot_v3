import { Project } from "@/domain/entities/Project";
import { buttonVariants } from "@/presentation/shadcn/components/ui/button";
import { cn } from "@/presentation/shadcn/lib/utils";
import { Link } from "react-router-dom";

const ProjectsListItem = (project: Project) => {
  return (
    <Link
      to={`/project/${project.id}`}
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "justify-start",
      )}
    >
      {project.title}
    </Link>
  );
};
export default ProjectsListItem;
