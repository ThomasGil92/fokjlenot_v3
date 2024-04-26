/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@/presentation/shadcn/components/ui/card";
import ProjectsListCardHeader from "../../atoms/Dashboard/ProjectsListCardHeader";
import ProjectsList from "../../molecules/Dashboard/ProjectsList";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { getProjectsListByUserId } from "@/core/use-cases/projects/getProjectListByUserId";

const ProjectsMenu = () => {
  const dispatch=useAppDispatch()
  const { list: projects, loading } = useAppSelector((state) => state.projects);
const token=useAppSelector(state=>state.auth.access_token!)
 useEffect(() => {
    dispatch(getProjectsListByUserId({token}));
  }, []);

  return (
    <>
      <Card className='col-span-2 border rounded-lg '>
        <ProjectsListCardHeader />
        {loading ? <p>Loading</p> : <ProjectsList projects={projects} />}
      </Card>
    </>
  );
};
export default ProjectsMenu;