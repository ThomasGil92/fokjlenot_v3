import { Pie } from "react-chartjs-2";

import "chart.js/auto";
import { useRef } from "react";
import { useAppSelector } from "@/infra/store/reduxStore";
import { ProjectStatus } from "@/adapters/secondary/project/project";
const ProjectStatusChart = () => {
  const ref = useRef();
  const projects = useAppSelector((state) => state.projects.list);

  const projectsStatusData = () => {
    const pendingProjects = projects.filter(
      (project) => project.status === ProjectStatus.PENDING,
    );
    const progressProject = projects.filter(
      (project) => project.status === ProjectStatus.PROGRESS,
    );
    const doneProjects = projects.filter(
      (project) => project.status === ProjectStatus.DONE,
    );
    return [
      pendingProjects.length,
      progressProject.length,
      doneProjects.length,
    ];
  };

  return (
    <div data-testid='projectStatusChart'>
      <Pie
        ref={ref}
        options={{}}
        data={{
          labels: ["Pending", "Progress", "Done"],
          datasets: [
            {
              
              data: projectsStatusData(),
              backgroundColor: ["#F41524", "#19ACF0", "#14E174"],
              borderWidth: 0,
            },
          ],
        }}
        // {...props}
      />
    </div>
  );
};

export default ProjectStatusChart;
