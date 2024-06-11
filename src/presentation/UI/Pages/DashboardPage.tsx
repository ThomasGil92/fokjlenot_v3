import { getProjectsListByUserId } from "@/core/use-cases/projects/getProjectListByUserId";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import ProjectStatusSection from "@/presentation/components/organisms/Dashboard/ProjectStatusSection";
import ProjectsMenu from "@/presentation/components/organisms/Dashboard/ProjectsMenu";
import { useEffect } from "react";

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token!);
  const userId = useAppSelector((state) => state.auth.user!.id);
  useEffect(() => {
    dispatch(getProjectsListByUserId({ token, userId }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <header className='text-center mb-5'>
        <h1 className='text-4xl font-bold'>Projets</h1>
      </header>
      <main className='px-5 md:grid grid-cols-12 gap-4'>
        <ProjectsMenu />
        <div className='col-span-10 grid md:grid-cols-12 gap-4'>
          <ProjectStatusSection />
        </div>
      </main>
    </>
  );
};

export default DashboardPage;
