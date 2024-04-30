import { Card, CardContent } from "@/presentation/shadcn/components/ui/card";
import ProjectCardHeader from "../../molecules/Project/ProjectCardHeader";
import { TaskStatus } from "@/adapters/secondary/task/task";
import StatusTaskColumn from "../../molecules/Project/StatusTaskColumn";
import { useAppSelector } from "@/infra/store/reduxStore";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {
  doneTasks,
  pendingTasks,
  progressTasks,
} from "@/adapters/primary/react/selectors/filteredByTaskStatus.selector";

const ProjectCard = () => {
  //Ajouter les taches triées selon le status
  const doneTaskItems = useAppSelector(doneTasks);
  const progressTaskItems = useAppSelector(progressTasks);
  const pendingTaskItems = useAppSelector(pendingTasks);

  return (
    <Card className='mt-5 divide-y'>
      <ProjectCardHeader />
      <CardContent className='grid md:grid-cols-12 px-0'>
        <DndProvider backend={HTML5Backend}>
          <StatusTaskColumn
            status={TaskStatus.PENDING}
            tasks={pendingTaskItems.tasks}
          />
          <StatusTaskColumn
            status={TaskStatus.PROGRESS}
            tasks={progressTaskItems.tasks}
          />
          <StatusTaskColumn
            status={TaskStatus.DONE}
            tasks={doneTaskItems.tasks}
          />
        </DndProvider>
      </CardContent>
    </Card>
  );
};
export default ProjectCard;
