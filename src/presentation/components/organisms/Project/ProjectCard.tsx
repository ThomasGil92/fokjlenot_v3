import { Card } from "@/presentation/shadcn/components/ui/card";
import ProjectCardHeader from "../../molecules/Project/ProjectCardHeader";
import ProjectCardBody from "../../molecules/Project/ProjectCardBody";

const ProjectCard = () => {
  return (
    <Card className='mt-5 divide-y'>
      <ProjectCardHeader />
      <ProjectCardBody />
    </Card>
  );
};
export default ProjectCard;
