import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import { Badge } from "@/presentation/shadcn/components/ui/badge";
import { Separator } from "@radix-ui/react-select";

const TaskItem = ({ task }: { task: Task }) => {

const getVariantColor=(status:Task["status"])=>{
if(status===TaskStatus.PENDING) return "pending"
if(status===TaskStatus.DONE) return "done"
if(status===TaskStatus.PROGRESS) return "progress"
}
console.log(getVariantColor(task.status));
  return (
    <>
      <div className='w-full p-3'>
        <h3 className='text-lg font-bold'>{task.title}</h3>
        <Badge variant={getVariantColor(task.status)}>{task.status}</Badge>
      </div>
      <Separator />
    </>
  );
};
export default TaskItem;
