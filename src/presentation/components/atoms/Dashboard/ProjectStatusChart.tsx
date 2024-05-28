import { Chart, registerables } from "chart.js";
import { Chart as ReactChartJs } from "react-chartjs-2";
import { useRef } from "react";
import { useAppSelector } from "@/infra/store/reduxStore";
import { ProjectStatus } from "@/adapters/secondary/project/project";
const ProjectStatusChart = () => {
  const ref = useRef(null);
  const projects = useAppSelector((state) => state.projects.list);
  Chart.register(...registerables);
  const projectsStatusData = () => {
    const pendingProjects = projects.filter(
      (project) =>
        project.status.toLocaleUpperCase() ===
        ProjectStatus.PENDING.toUpperCase(),
    );
    const progressProject = projects.filter(
      (project) =>
        project.status.toLocaleUpperCase() ===
        ProjectStatus.PROGRESS.toUpperCase(),
    );
    const doneProjects = projects.filter(
      (project) =>
        project.status.toLocaleUpperCase() === ProjectStatus.DONE.toUpperCase(),
    );

    return [
      pendingProjects.length,
      progressProject.length,
      doneProjects.length,
    ];
  };

  return (
    <div data-testid='projectStatusChart' className='flex justify-center'>
      {projects.length > 0 && (
        <ReactChartJs
          type='pie'
          data={{
            labels: ["Pending", "Progress", "Done"],
            datasets: [
              {
                data: projectsStatusData(),
                backgroundColor: ["#F41524", "#19ACF0", "#14E174"],
                borderWidth: 2,
                borderColor: "black",
              },
            ],
          }}
          ref={ref}
          /* options={{}} */

          // {...props}
        />
      )}
    </div>
  );
};

export default ProjectStatusChart;
