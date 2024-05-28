import { CardContent } from "@/presentation/shadcn/components/ui/card";
import ProjectsListItem from "../../atoms/Dashboard/ProjectsListItem";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/presentation/shadcn/components/ui/dialog";
import { Button } from "@/presentation/shadcn/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
//import { addProject } from "@/domain/usecases/projects/projectsUseCase";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import SubmitButton from "../../atoms/shared/SubmitButton";
import AddProjectFormFields from "./AddProjectFormFields";
import { Form } from "@/presentation/shadcn/components/ui/form";
import { Project, ProjectStatus } from "@/adapters/secondary/project/project";
import { postNewProject } from "@/core/use-cases/projects/postNewProject";
import { useState } from "react";

interface ProjectListProp {
  projects: Project[];
}

const ProjectsList: React.FC<ProjectListProp> = ({ projects }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token!);
  const userId = useAppSelector((state) => state.auth.user?.id);

  const [open, setOpen] = useState(false);

  const formSchema = z.object({
    title: z
      .string()
      .min(1, { message: "You must provide a title for this project" }),

    status: z.nativeEnum(ProjectStatus),
    ownerId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",

      status: ProjectStatus.PENDING,
      ownerId: userId,
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(postNewProject({ token, newProject: values }));
    setOpen(false);
    form.reset();
  };

  return (
    <CardContent>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className='flex justify-end'>
          <DialogTrigger asChild className='p-3 text-center'>
            <Button
              data-testid='addButton'
              className='text-3xl text-center m-0 p-0 w-8 h-8 inline-block leading-8'
            >
              +
            </Button>
          </DialogTrigger>
        </div>

        <DialogContent
          data-testid='addProjectDialog'
          className=' md:w-6/12 h-dvh w-dvw justify-normal flex flex-col'
        >
          <DialogHeader>
            <DialogTitle className='text-3xl'>Create a new Project</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form
              data-testid='addProjectForm'
              onSubmit={form.handleSubmit(onSubmit)}
              className=''
            >
              <AddProjectFormFields form={form} />
              <SubmitButton text='Créer' testId='addProjectButton' />
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {projects.length > 0 &&
        projects.map((project) => (
          <div
            key={project.id + project.title + "ProjectListItem"}
            className='group flex flex-col gap-4 py-2'
          >
            <ProjectsListItem {...project} />
          </div>
        ))}
    </CardContent>
  );
};
export default ProjectsList;
