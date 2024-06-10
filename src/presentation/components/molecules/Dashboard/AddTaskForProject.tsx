import { useAppSelector } from "@/infra/store/reduxStore";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shadcn/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddTaskForProject = () => {
  const projects = useAppSelector((state) => state.projects.list);
  const FormSchema = z.object({
    projectId: z.string({
      required_error: "Veuillez choisir un projet",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      projectId: projects[0]?projects[0].id:undefined,
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Créer</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Créer un ticket</DialogTitle>
          {JSON.stringify(form.getValues())}
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
            <div>
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
            </div>
            {/* <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='username' className='text-right'>
                Username
              </Label>
              <Input
                id='username'
                defaultValue='@peduarte'
                className='col-span-3'
              />
            </div> */}
            <DialogFooter>
              <Button type='submit'>Save changes</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
export default AddTaskForProject;
