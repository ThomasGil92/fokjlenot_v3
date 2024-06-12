import { getProjectsListByUserId } from "@/core/use-cases/projects/getProjectListByUserId";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import ProjectsDataTable from "@/presentation/components/organisms/Projects/ProjectsDataTable";
import { useEffect } from "react";

const ProjectsPage = () => {
  const projects = useAppSelector((state) => state.projects.list);
  const token = useAppSelector((state) => state.auth.access_token!);
  const userId = useAppSelector((state) => state.auth.user!.id);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProjectsListByUserId({ token, userId }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container'>
      <h1 className='text-3xl font-semibold'>Projets</h1>
      <ProjectsDataTable projects={projects} />
    </div>
  );
};

export default ProjectsPage;
