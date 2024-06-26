/* eslint-disable react-hooks/exhaustive-deps */

import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ProjectCard from "@/presentation/components/organisms/Project/ProjectCard";
import { getProjectById } from "@/core/use-cases/projects/getProjectById";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { getProjectsListByUserId } from "@/core/use-cases/projects/getProjectListByUserId";

const ProjectPage = () => {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.projects.selected);
  const token = useAppSelector((state) => state.auth.access_token!);
  const userId = useAppSelector((state) => state.auth.user!.id);
  const params = useParams();

  useEffect(() => {}, []);
  useEffect(() => {
    dispatch(getProjectsListByUserId({ token, userId }));
    dispatch(getProjectById({ token, projectId: params.id! }));
  }, []);

  return (
    project && (
      <div className='container'>
        <h1 className='text-4xl font-bold font-mono'>{project.title}</h1>
        <ProjectCard />
      </div>
    )
  );
};

export default ProjectPage;
