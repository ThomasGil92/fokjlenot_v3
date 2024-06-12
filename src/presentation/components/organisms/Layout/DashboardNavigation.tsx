import { useAppSelector } from "@/infra/store/reduxStore";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import { Separator } from "@/presentation/shadcn/components/ui/separator";
import { cn } from "@/presentation/shadcn/lib/utils";
import React, { useEffect, useState } from "react";
import AddProjectFormFields from "../../molecules/Layout/AddProjectFormFields";
import AddTaskForProject from "../../molecules/Layout/AddTaskForProject";
import { Task, TaskStatus } from "@/adapters/secondary/task/task";

const DashboardNavigation = () => {
  const projects = useAppSelector((state) => state.projects.list || []);

  const [allTasks, setAllTasks] = useState<Task[]>([]);
  useEffect(() => {
    const tasks: Task[] = [];
    projects.forEach((project) => {
      if (project.tasks) {
        tasks.push(...project.tasks);
      }
    });
    setAllTasks(tasks);
  }, [projects]);

  const FilteredByStatusTasks = ({
    status,
    tasks,
  }: {
    status: string;
    tasks: Task[];
  }) => {
    const filteredTasks = tasks.filter((task) => task.status === status);
    if (filteredTasks.length > 0)
      return (
        <>
          <p className='px-2 text-sm'>{status}</p>
          <Separator />
          {filteredTasks.map((task) => {
            return (
              <ListItem
                title={task.title}
                key={task.id}
                href={`/project/${task.projectId}`}
              >
                {task.description}
              </ListItem>
            );
          })}
        </>
      );
  };

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Vos tâches</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className='flex flex-col gap-3 pt-3 md:w-[400px] lg:w-[200px] bg-white border-slate-100 border-2 m-5 ms-1 rounded-xl shadow-md shadow-slate-400 lg:grid-cols-[.75fr_1fr]'>
              {allTasks.length>0?Object.values(TaskStatus).map((status, id) => {
                return (
                  <FilteredByStatusTasks
                    status={status}
                    key={id}
                    tasks={allTasks}
                  />
                );
              }):<p className="p-3">Aucunes tâches en cours</p>}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Projets</NavigationMenuTrigger>
          <NavigationMenuContent className='p-0'>
            <ul className='flex flex-col gap-3 p-0 pt-6 pb-2 md:w-[400px] lg:w-[200px] bg-white  m-5 ms-1 rounded-xl shadow-md shadow-slate-400 lg:grid-cols-[.75fr_1fr]'>
              <p className='px-2 text-xs font-semibold text-secondary-foreground'>
                {projects.length>0?"ÉLÉMENTS RÉCENTS":"Aucun projet en cours"}
              </p>
              {projects.slice(0, 4).map((project, id) => (
                <ListItem
                  className='m-0 rounded-none'
                  key={id + project.title}
                  title={project.title}
                  href={`/project/${project.id}`}
                >
                  {project.description}
                </ListItem>
              ))}
              <Separator className='my-2' />
              <NavigationMenuLink
                href='/projects'
                className='hover:bg-secondary  p-2'
              >
                Afficher tous les projets
              </NavigationMenuLink>
              <AddProjectFormFields>
                <p
                  data-testid='addButton '
                  className='text-left pointer cursor-pointer hover:bg-secondary  p-2'
                >
                  Créer un projet
                </p>
              </AddProjectFormFields>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <AddTaskForProject />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default DashboardNavigation;
