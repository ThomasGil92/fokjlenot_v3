import { Task, TaskPriority } from "@/adapters/secondary/task/task";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import {
  Form,
  FormControl,
  FormField,
} from "@/presentation/shadcn/components/ui/form";
import { Label } from "@/presentation/shadcn/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/presentation/shadcn/components/ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/presentation/shadcn/components/ui/radio-group";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SubmitButton from "./SubmitButton";
import { updateTask } from "@/core/use-cases/tasks/updateTask";

const PopoverButton = ({
  children,
  task,
}: {
  children: ReactNode;
  task: Task;
}) => {
  const [open, setOpen] = useState(false);
  const token = useAppSelector((state) => state.auth.access_token!);

  const dispatch = useAppDispatch();

  const formSchema = z.object({
    priority: z.nativeEnum(TaskPriority),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { priority: task.priority },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values.priority);
    dispatch(
      updateTask({
        token,
        updatedTask: { ...task, priority: values.priority },
      }),
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-40'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Priority</h4>
            <p className='text-sm text-muted-foreground'>
              Change the priority of this task.
            </p>
          </div>
          <Form {...form}>
            <form
              data-testid='updateStatusForm'
              onSubmit={form.handleSubmit(onSubmit)}
              className=''
            >
              <FormField
                name='priority'
                render={({ field }) => {
                  console.log(field);
                  return (
                    <RadioGroup
                      defaultValue={task.priority}
                      onValueChange={field.onChange}
                      name='priority'
                    >
                      <div className='flex items-center space-x-2'>
                        <FormControl>
                          <RadioGroupItem
                            value={TaskPriority.LOW}
                            id='low'
                            {...form.register("priority")}
                          />
                        </FormControl>
                        <Label htmlFor='low'>Low</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <FormControl>
                          <RadioGroupItem
                            value={TaskPriority.MEDIUM}
                            id='medium'
                            {...form.register("priority")}
                          />
                        </FormControl>
                        <Label htmlFor='medium'>Medium</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <FormControl>
                          
                          <RadioGroupItem
                            value={TaskPriority.HIGHT}
                            id='hight'
                            {...form.register("priority")}
                          />
                        </FormControl>
                        <Label htmlFor='hight'>Hight</Label>
                      </div>
                    </RadioGroup>
                  );
                }}
              />
              <SubmitButton
                text='Save priority'
                testId='updatePriorityButton'
              />
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default PopoverButton;
