import { Task, TaskPriority, TaskStatus } from "@/adapters/secondary/task/task";
import { useMediaQuery } from "@react-hook/media-query";
import { Badge } from "@/presentation/shadcn/components/ui/badge";
import { Separator } from "@radix-ui/react-select";
import { Button } from "@/presentation/shadcn/components/ui/button";

import { useDrag, DragSourceMonitor } from "react-dnd";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { updateTask } from "@/core/use-cases/tasks/updateTask";
import { useState } from "react";

import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/presentation/shadcn/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/shadcn/components/ui/form";
import { Input } from "@/presentation/shadcn/components/ui/input";
import { Label } from "@/presentation/shadcn/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/presentation/shadcn/components/ui/select";
import { SheetFooter } from "@/presentation/shadcn/components/ui/sheet";
interface DropResult {
  allowedDropEffect: string;
  dropEffect: string;
  name: string;
}
const TaskItem = ({ task }: { task: Task }) => {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.access_token!);

  const formSchema = z.object({
    title: z.string().min(1, { message: "This field has to be filled." }),
    description: z.string().min(1),
    status: z.nativeEnum(TaskStatus),
    projectId: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
      projectId: task.projectId,
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    setOpen(false);
    try {
      await dispatch(
        updateTask({
          token,
          updatedTask: { ...task, ...values },
        }),
      );
      form.reset();
    } catch (err) {
      setOpen(true);
    }
  };
  const getPriorityVariantColor = (priority: Task["priority"]) => {
    if (priority === undefined) return null;
    if (priority === TaskPriority.LOW) return "low";
    if (priority === TaskPriority.MEDIUM) return "medium";
    if (priority === TaskPriority.HIGHT) return "hight";
  };

  const [{ opacity }, drag] = useDrag(
    () => ({
      type: "task",
      item: task,
      end(item, monitor) {
        const dropResult = monitor.getDropResult() as DropResult;

        dispatch(
          updateTask({
            token,
            updatedTask: { ...item, status: dropResult.name as TaskStatus },
          }),
        );
      },
      collect: (monitor: DragSourceMonitor) => ({
        opacity: monitor.isDragging() ? 0.4 : 1,
        isDragging: monitor.isDragging(),
      }),
    }),
    [task],
  );

  const updateTaskForm = () => {
    return (
      <Form {...form}>
        <form
          data-testid='addTaskForm'
          onSubmit={form.handleSubmit(handleSubmit)}
          className='grid gap-4 py-4'
        >
          <FormField
            name={"title"}
            render={({ field }) => {
              return (
                <FormItem>
                  <div className='grid grid-cols-6 items-center gap-4'>
                    <FormLabel htmlFor='title' hidden className='text-right'>
                      Titre
                    </FormLabel>
                   {/*  <FormControl> */}
                      <Input
                        autoFocus={false}
                        type='text'
                        id='title'
                        placeholder='Titre de la tâche'
                        className='col-start-2 col-span-4'
                        {...field}
                        {...form.register("title")}
                      />
                   {/*  </FormControl> */}
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
                      value={field.value}
                      name={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className='col-start-2 col-span-4 border'>
                        <SelectValue
                          placeholder='Choose a status'
                          ref={field.ref}
                        />
                      </SelectTrigger>
                      <SelectContent id={"status"}>
                        <SelectGroup>
                          {Object.values(TaskStatus).map((option, id) => (
                            <SelectItem
                              value={option}
                              key={id + option}
                              {...form.register("status")}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </div>
              );
            }}
          />

          <SheetFooter>
            <Button type='submit'>Save your new task</Button>
          </SheetFooter>
        </form>
      </Form>
    );
  };

  return (
    <>
      <div ref={drag} className='w-full mb-3' style={{ opacity }}>
        {isDesktop && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className='w-full text-left bg-secondary p-2 rounded-md'>
              <>
                <h3 className='text-lg font-bold'>{task.title}</h3>
                <div className='flex justify-end'>
                  {task.priority !== undefined && (
                    <Badge
                      variant={getPriorityVariantColor(task.priority)}
                      className={`p-0 m-0 h-4 w-4`}
                    />
                  )}
                </div>
              </>
            </DialogTrigger>
            <DialogContent onCloseAutoFocus={(e)=>e.preventDefault()}
              className='sm:max-w-[425px]'
              
            >
              {updateTaskForm()}
             
            </DialogContent>
          </Dialog>
        )}
      </div>
      <Separator />
    </>
  );
};
export default TaskItem;
