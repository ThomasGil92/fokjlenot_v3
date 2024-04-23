import { Card } from "@/presentation/shadcn/components/ui/card";
import ProjectStatusChart from "../../atoms/Dashboard/ProjectStatusChart";

const ProjectStatusSection = () => {
  return (
    <Card className='col-span-5 p-4'>
      <h2>Status average</h2>
      <ProjectStatusChart />
    </Card>
  );
};
export default ProjectStatusSection;
