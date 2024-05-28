import { useAppSelector } from "@/infra/store/reduxStore";
import {
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/shadcn/components/ui/card";

const ProjectsListCardHeader = () => {
  const projects=useAppSelector(state=>state.projects.list)
  return (
    <CardHeader>
      <CardTitle>Your projects</CardTitle>
      <CardDescription>Vous avez {projects.length} projet{projects.length>1 && "s"}</CardDescription>
    </CardHeader>
  );
};
export default ProjectsListCardHeader;
