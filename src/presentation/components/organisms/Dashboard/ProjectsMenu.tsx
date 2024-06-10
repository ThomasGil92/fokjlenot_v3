/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@/presentation/shadcn/components/ui/card";
import ProjectsListCardHeader from "../../atoms/Dashboard/ProjectsListCardHeader";
import ProjectsList from "../../molecules/Dashboard/ProjectsList";

import { useAppSelector } from "@/infra/store/reduxStore";

const ProjectsMenu = () => {
  const { list: projects } = useAppSelector((state) => state.projects);
  const loading = useAppSelector((state) => state.global.loading);

  return (
    <>
      <Card className=' w-11/12 mx-auto md:col-span-2 text-center md:text-left border rounded-lg '>
        <ProjectsListCardHeader />
        {loading ? <p>Loading</p> : <ProjectsList projects={projects} />}
      </Card>
    </>
  );
};
export default ProjectsMenu;
