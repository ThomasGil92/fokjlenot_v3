/* eslint-disable react-hooks/exhaustive-deps */
import { Card } from "@/presentation/shadcn/components/ui/card";
import ProjectsListCardHeader from "../../atoms/Dashboard/ProjectsListCardHeader";
import ProjectsList from "../../molecules/Dashboard/ProjectsList";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { getProjectsListByUserId } from "@/core/use-cases/projects/getProjectListByUserId";

const ProjectsMenu = () => {
  const dispatch = useAppDispatch();
  const { list: projects } = useAppSelector((state) => state.projects);
  const loading = useAppSelector((state) => state.global.loading);
  const token = useAppSelector((state) => state.auth.access_token!);
  const userId = useAppSelector((state) => state.auth.user!.id);
  useEffect(() => {
    dispatch(getProjectsListByUserId({ token, userId }));
  }, []);

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
