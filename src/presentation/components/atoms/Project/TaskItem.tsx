import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import { Badge } from "@/presentation/shadcn/components/ui/badge";
import { Separator } from "@radix-ui/react-select";
import PopoverButton from "../shared/PopoverButton";
import { Button } from "@/presentation/shadcn/components/ui/button";
import { useDrag, DragSourceMonitor } from "react-dnd";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { updateTask } from "@/core/use-cases/tasks/updateTask";
interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}
const TaskItem = ({ task }: { task: Task}) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token!);
  const getVariantColor = (status: Task["status"]) => {
    if (status === TaskStatus.PENDING) return "pending";
    if (status === TaskStatus.DONE) return "done";
    if (status === TaskStatus.PROGRESS) return "progress";
  };

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "task",
      item: task,
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;
        dispatch(
          updateTask({
            token,
            updatedTask: { ...item, status: dropResult.name as TaskStatus },
          }),
        );
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [task],
  );

  return (
    <>
      <div ref={drag} className='w-full p-3' style={{ opacity }}>
        <h3 className='text-lg font-bold'>{task.title}</h3>
        <PopoverButton task={task}>
          <Button variant={"ghost"} className={`p-0 m-0 hover:bg-transparent`}>
            <Badge
              variant={getVariantColor(task.status)}
              className={` hover:bg-${task.status}`}
            >
              {task.status}
            </Badge>
          </Button>
        </PopoverButton>
      </div>
      <Separator />
    </>
  );
};
export default TaskItem;
