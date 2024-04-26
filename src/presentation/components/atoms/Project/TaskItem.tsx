import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import { Badge } from "@/presentation/shadcn/components/ui/badge";
import { Separator } from "@radix-ui/react-select";
import PopoverButton from "../shared/PopoverButton";
import { Button } from "@/presentation/shadcn/components/ui/button";

const TaskItem = ({ task }: { task: Task }) => {
  const getVariantColor = (status: Task["status"]) => {
    if (status === TaskStatus.PENDING) return "pending";
    if (status === TaskStatus.DONE) return "done";
    if (status === TaskStatus.PROGRESS) return "progress";
  };
  return (
    <>
      <div className='w-full p-3'>
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
