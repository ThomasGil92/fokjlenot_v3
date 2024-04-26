import { Task, TaskStatus } from "@/adapters/secondary/task/task";
import { updateTaskStatus } from "@/core/use-cases/tasks/updateTaskStatus";
import { useAppDispatch, useAppSelector } from "@/infra/store/reduxStore";
import { Form, FormField } from "@/presentation/shadcn/components/ui/form";
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
    status: z.nativeEnum(TaskStatus),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { status: task.status },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    dispatch(
      updateTaskStatus({ token, taskId: task.id, newStatus: values.status }),
    );
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className='w-40'>
        <div className='grid gap-4'>
          <div className='space-y-2'>
            <h4 className='font-medium leading-none'>Status</h4>
            <p className='text-sm text-muted-foreground'>
              Change the status of this task.
            </p>
          </div>
          <Form {...form}>
            <form
              data-testid='updateStatusForm'
              onSubmit={form.handleSubmit(onSubmit)}
              className=''
            >
              <FormField
                name='status'
                render={({ field }) => {
                  return (
                    <RadioGroup
                      defaultValue={task.status}
                      onValueChange={field.onChange}
                      name='status'
                    >
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value='pending'
                          id='r1'
                          {...form.register("status")}
                        />
                        <Label htmlFor='r1'>Pending</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value='progress'
                          id='r2'
                          {...form.register("status")}
                        />
                        <Label htmlFor='r2'>Progress</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem
                          value='done'
                          id='r3'
                          {...form.register("status")}
                        />
                        <Label htmlFor='r3'>Done</Label>
                      </div>
                    </RadioGroup>
                  );
                }}
              />
              <SubmitButton text='Save status' testId='updateStatusButton' />
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};
export default PopoverButton;
