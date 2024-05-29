import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import TaskItem from "../../atoms/Project/TaskItem";
import { DropTargetMonitor, useDrop } from "react-dnd";

interface StatusTaskColumnProps {
  tasks: Task[];
  status: TaskStatus;
}

const StatusTaskColumn = ({ tasks, status }: StatusTaskColumnProps) => {
  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: "task",
      drop: () => ({
        name: `${status}`,
      }),
      collect: (monitor: DropTargetMonitor) => ({
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      }),
    }),
    [],
  );
  function selectBackgroundColor(isActive: boolean) {
    if (isActive) {
      return "#a5f3fc";
    }
  }
  const isActive = canDrop && isOver;
  //const backgroundColor = selectBackgroundColor(isActive, canDrop);

  return (
    <div
      ref={drop}
      className='md:col-span-4 md:grid-cols-12 border p-3'
      style={{ backgroundColor: selectBackgroundColor(isActive) }}
    >
      <div
        className=' font-semibold bg-white'
        style={{ backgroundColor: selectBackgroundColor(isActive) }}
      >
        <h3 className='text-xl mb-5'>{status[0].toUpperCase() + status.slice(1)} <span className="text-primary/60">{tasks.length}</span></h3>
      </div>

      {tasks &&
        tasks.map((task, id) => {
          return <TaskItem key={task.title + id} task={task} />;
        })}
    </div>
  );
};
export default StatusTaskColumn;
