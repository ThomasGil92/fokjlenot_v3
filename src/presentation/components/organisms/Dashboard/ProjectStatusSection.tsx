import { Card } from "@/presentation/shadcn/components/ui/card";
import ProjectStatusChart from "../../atoms/Dashboard/ProjectStatusChart";

const ProjectStatusSection = () => {
  return (
    <Card className='w-11/12 mx-auto my-5 md:col-span-5 p-4 text-center'>
      <h2>Status average</h2>
      <ProjectStatusChart />
    </Card>
  );
};
export default ProjectStatusSection;
