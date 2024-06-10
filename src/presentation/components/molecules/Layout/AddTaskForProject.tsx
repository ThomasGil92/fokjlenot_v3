import { TaskStatus } from "@/adapters/secondary/task/task";
import { postNewTask } from "@/core/use-cases/tasks/postNewTask";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { Button } from "@/presentation/shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/shadcn/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/shadcn/components/ui/form";
import { Input } from "@/presentation/shadcn/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shadcn/components/ui/select";
import { Textarea } from "@/presentation/shadcn/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddTaskForProject = () => {
  const [open, setOpen] = useState(false);
  const projects = useAppSelector((state) => state.projects.list);
  const token = useAppSelector((state) => state.auth.access_token!);
  const dispatch = useAppDispatch();
  const FormSchema = z.object({
    projectId: z.string({
      required_error: "Veuillez choisir un projet",
    }),
    status: z.nativeEnum(TaskStatus),
    title: z.string({ required_error: "Veuillez indiquer un titre" }).min(1),
    description: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectId: "",
      status: TaskStatus.PENDING,
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    if (projects.length > 0) {
      form.setValue("projectId", projects[0].id!);
    }
  }, [projects, form]);

  function onSubmit(data: z.infer<typeof FormSchema>) {
    dispatch(postNewTask({ token, newTask: data }));
    form.reset()
    setOpen(false)
  }

  return (
    projects.length > 0 && (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>Créer</Button>
        </DialogTrigger>
        <DialogContent className='sm:max-w-[425px]'>
          <DialogHeader>
            <DialogTitle>Créer un ticket</DialogTitle>

            <DialogDescription>
              Les champs obligatoires sont marqués d'un astérisque{" "}
              <span className='text-destructive'>*</span>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='grid gap-4 py-4'
            >
              <div className='flex flex-col gap-3'>
                <FormField
                  disabled={!projects[0]}
                  control={form.control}
                  name='projectId'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Projet <span className='text-destructive'>*</span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        name={field.name}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue
                              placeholder={
                                projects[0]
                                  ? `${projects[0].title}`
                                  : "Vous n'avez aucun projet en cours"
                              }
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='p-3'>
                          <p>Projets récents</p>
                          {projects.map((project) => {
                            return (
                              <SelectItem
                                key={project.title + "projects"}
                                value={project.id!}
                                {...form.register(field.name)}
                              >
                                {project.title}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  disabled={!projects[0]}
                  control={form.control}
                  name='status'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        État de la tâche{" "}
                        <span className='text-destructive'></span>
                      </FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        name={field.name}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder={TaskStatus.PENDING} />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className='p-3'>
                          <p>États</p>
                          {Object.values(TaskStatus).map((status) => {
                            return (
                              <SelectItem
                                key={status + "status"}
                                value={status}
                                {...form.register(field.name)}
                              >
                                {status}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={"title"}
                  render={({ field }) => {
                    return (
                      <FormItem className='mb-5'>
                        <FormLabel htmlFor={`#${field.name}`}>
                          Titre <span className='text-destructive'>*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            {...form.register("title")}
                            type='text'
                            placeholder='Title here'
                            id={field.name}
                            data-testid='titleInput'
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
                <FormField
                  control={form.control}
                  name={"description"}
                  render={({ field }) => {
                    return (
                      <FormItem className='mb-5'>
                        <FormLabel htmlFor={`#${field.name}`}>
                          Description
                        </FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder='Description de la tâche'
                            id={field.name}
                            data-testid='titleInput'
                            {...form.register("description")}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    );
                  }}
                />
              </div>

              <DialogFooter>
                <Button
                  variant={"secondary"}
                  onClick={() => {
                    form.reset();
                    setOpen(false);
                  }}
                  type='button'
                >
                  Annuler
                </Button>
                <Button type='submit'>Créer</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    )
  );
};
export default AddTaskForProject;
