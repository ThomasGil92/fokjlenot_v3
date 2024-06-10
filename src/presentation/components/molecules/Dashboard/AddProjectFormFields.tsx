import { useForm } from "react-hook-form";
import { ProjectStatus } from "@/adapters/secondary/project/project";
import {
  Form,
  FormControl,
  FormDescription,
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
import { TaskStatus } from "@/adapters/secondary/task/task";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { ReactNode, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { postNewProject } from "@/core/use-cases/projects/postNewProject";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/presentation/shadcn/components/ui/dialog";
import { Button } from "@/presentation/shadcn/components/ui/button";
import SubmitButton from "../../atoms/shared/SubmitButton";

// interface AddProjectFieldsInterface {
//   form: UseFormReturn<
//     {
//       title: string;

//       status: ProjectStatus;
//       ownerId: string;
//     },
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     any,
//     undefined
//   >;
// }

const AddProjectFormFields = ({ children }: { children?: ReactNode }) => {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token!);
  const userId = useAppSelector((state) => state.auth.user?.id);

  const [open, setOpen] = useState(false);
  //const { register } = form;
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
    console.log(values);
    dispatch(postNewProject({ token, newProject: values }));
    setOpen(false);
    form.reset();
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <div className=''>
          <DialogTrigger asChild className=''>
            {!children ? (
              <Button
                data-testid='addButton'
                variant={"secondary"}
                className='text-3xl text-center m-0 p-0 w-8 h-8 inline-block leading-8'
              >
                +
              </Button>
            ) : (
              children
            )}
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
              <FormField
                name={"title"}
                render={({ field }) => {
                  return (
                    <FormItem className='mb-5'>
                      <FormLabel htmlFor={`#${field.name}`}>Title:</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          {...form.register(field.name)}
                          type='text'
                          placeholder='Title here'
                          id={field.name}
                          data-testid='titleInput'
                        />
                      </FormControl>

                      <FormDescription>My New Project</FormDescription>

                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              {/* <FormFieldZ
        placeholder='Title here'
        description_helper='My New Project'
        label='Title:'
        dataId='titleInput'
        type='text'
        register={register}
        name='title'
        required
      /> */}

              <FormField
                name='status'
                //control={control}
                render={({ field }) => {
                  return (
                    <FormItem className='mb-5'>
                      <FormLabel htmlFor={`#${field.name}`}>Status:</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          name={field.name}
                          defaultValue={field.value}
                        >
                          <SelectTrigger className='w-[180px]'>
                            <SelectValue placeholder='Choose a status' />
                          </SelectTrigger>
                          <SelectContent>
                            {Object.values(TaskStatus).map((option, id) => (
                              <SelectItem
                                value={option.toLowerCase()}
                                key={id + option}
                                {...form.register(field.name)}
                              >
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormDescription>
                        Select the status of the project
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <SubmitButton text='Créer' testId='addProjectButton' />
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddProjectFormFields;
