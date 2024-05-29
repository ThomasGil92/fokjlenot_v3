import { useAppSelector } from "@/infra/store/reduxStore";
import {
  CardHeader,
  CardTitle,
} from "@/presentation/shadcn/components/ui/card";

const ProjectsListCardHeader = () => {
  const projects=useAppSelector(state=>state.projects.list)
  return (
    <CardHeader>
      <CardTitle>Vous avez {projects.length} projet{projects.length>1 && "s"}</CardTitle>
    </CardHeader>
  );
};
export default ProjectsListCardHeader;
