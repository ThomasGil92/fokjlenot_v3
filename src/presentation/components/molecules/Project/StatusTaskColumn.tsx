import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import TaskItem from "../../atoms/Project/TaskItem";
import { DropTargetMonitor, useDrop } from "react-dnd";

interface StatusTaskColumnProps {
  tasks: Task[];
  status: TaskStatus;
}

const StatusTaskColumn = ({
  tasks,
  status,
  
}: StatusTaskColumnProps) => {
    const [{ canDrop, isOver,hovered }, drop] = useDrop(
      () => ({
        accept: "task",
        drop: () => ({
          name: `${status}`,
        }),
        collect: (monitor: DropTargetMonitor) => ({
          hovered: monitor.isOver()?"red":"blue",
          canDrop: monitor.canDrop(),
        }),
      }),
      [],
    );
  return (
    <div ref={drop} className='col-span-4 md:grid-cols-12 border' style={{hovered}}>
      <div className='border-b py-3 text-center'>
        <h3 className='text-xl'>{status[0].toUpperCase() + status.slice(1)}</h3>
      </div>
      {tasks &&
        tasks.map((task, id) => {
          return <TaskItem key={task.title + id} task={task} />;
        })}
    </div>
  );
};
export default StatusTaskColumn;
