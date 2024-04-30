import { CardHeader } from "@/presentation/shadcn/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/presentation/shadcn/components/ui/sheet";
import { Input } from "@/presentation/shadcn/components/ui/input";
import { Label } from "@/presentation/shadcn/components/ui/label";
import { Button } from "@/presentation/shadcn/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectGroup,
  SelectTrigger,
} from "@/presentation/shadcn/components/ui/select";
import { z } from "zod";
import { TaskStatus } from "@/adapters/secondary/task/task";
import {  useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/shadcn/components/ui/form";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { postNewTask } from "@/core/use-cases/tasks/postNewTask";
import { useState } from "react";

const ProjectCardHeader = () => {
  const [open,setOpen]=useState(false)
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token!);
  const selected = useAppSelector((state) => state.projects.selected);

  const formSchema = z.object({
    title: z.string().min(1, { message: "This field has to be filled." }),
    description: z.string().min(1),
    status: z.nativeEnum(TaskStatus),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      status: TaskStatus.PENDING,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    
    console.log("test");
    const newTask = { ...values, projectId: selected?.id, collaborators: [] };
    await dispatch(postNewTask({ token, newTask }));
setOpen(false)
    form.reset();
  };

  return (
    <CardHeader className='flex p-0'>
      <NavigationMenu className=' ms-auto'>
        <NavigationMenuList className='divide-x-4 space-x-0'>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                data-testid='addTask'
                className='hover:bg-secondary-foreground hover:text-slate-100 rounded-none rounded-e'
              >
                Add task
              </Button>
            </SheetTrigger>
            <SheetContent side={"bottom"}>
              <SheetHeader>
                <SheetTitle>Add a task</SheetTitle>
                <SheetDescription>
                  Add a task to your project. Click save when you're done.
                </SheetDescription>
              </SheetHeader>

              <Form {...form}>
                <form
                  data-testid='addTaskForm'
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='grid gap-4 py-4'
                >
                  <FormField
                  /*   control={form.control} */
                    name={"title"}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <div className='grid grid-cols-6 items-center gap-4'>
                            <FormLabel htmlFor='title' className='text-right'>
                              Title
                            </FormLabel>
                            <FormControl>
                              <Input
                                type='text'
                                id='title'
                                className='col-start-2 col-span-4'
                                {...field}
                                {...form.register("title", { required: true })}
                              />
                            </FormControl>
                            <FormMessage />
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                  <FormField
                    name={"description"}
                    render={({ field }) => {
                      return (
                        <div className='grid grid-cols-6 items-center gap-4'>
                          <Label htmlFor='description' className='text-right'>
                            Description
                          </Label>
                          <Input
                            {...field}
                            id='description'
                            className='col-start-2 col-span-4'
                            {...form.register("description", {
                              required: true,
                            })}
                          />
                        </div>
                      );
                    }}
                  />
                  <FormField
                    name='status'
                    render={({ field }) => {
                      return (
                        <div className='grid grid-cols-6 items-center gap-4 text-right'>
                          <Label htmlFor='status' className='text-right'>
                            Status
                          </Label>
                          <FormControl>
                            <Select
                              defaultValue={field.value}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger className='col-start-2 col-span-4 border'>
                                <SelectValue placeholder='Choose a status' />
                              </SelectTrigger>
                              <SelectContent id={"status"}>
                                <SelectGroup>
                                  {Object.values(TaskStatus).map(
                                    (option, id) => (
                                      <SelectItem
                                        value={option.toLowerCase()}
                                        key={id + option}
                                        {...form.register("status")}
                                      >
                                        {option}
                                      </SelectItem>
                                    ),
                                  )}
                                </SelectGroup>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </div>
                      );
                    }}
                  />

                  <SheetFooter>
                    {/* <SheetClose asChild> */}
                      <Button type='submit'>Save your new task</Button>
                    {/* </SheetClose> */}
                  </SheetFooter>
                </form>
              </Form>
            </SheetContent>
          </Sheet>
        </NavigationMenuList>
      </NavigationMenu>
    </CardHeader>
  );
};
export default ProjectCardHeader;
