import { CardHeader } from "@/presentation/shadcn/components/ui/card";
import {
  NavigationMenu,
  NavigationMenuList,
} from "@/presentation/shadcn/components/ui/navigation-menu";
import {
  Sheet,
  SheetClose,
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
  SelectValue,SelectGroup, SelectTrigger 
} from "@/presentation/shadcn/components/ui/select";
import { z } from "zod";
import { TaskStatus } from "@/adapters/secondary/task/task";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/presentation/shadcn/components/ui/form";

const ProjectCardHeader = () => {
  const formSchema = z.object({
    title: z.string().min(1, { message: "This field has to be filled." }),
    description: z.string(),
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
    // e.preventDefault();

    /* await dispatch(login(values));
  navigate("/dashboard"); */
    form.reset();
  };

  return (
    <CardHeader className='flex p-0'>
      <NavigationMenu className=' ms-auto'>
        <NavigationMenuList className='divide-x-4 space-x-0'>
          <Sheet>
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
                  data-testid='loginForm'
                  onSubmit={form.handleSubmit(handleSubmit)}
                  className='grid gap-4 py-4'
                >
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='title' className='text-right'>
                      Title
                    </Label>
                    <Input
                      name='title'
                      value='New task'
                      className='col-span-3'
                      {...form.register("title")}
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Label htmlFor='description' className='text-right'>
                      Description
                    </Label>
                    <Input
                      id='description'
                      name='description'
                      value='Description of the task'
                      className='col-span-3'
                      {...form.register(name)}
                    />
                  </div>
                  <div className='grid grid-cols-4 items-center gap-4'>
                    <Select>
                      <SelectTrigger className='w-[180px] border'>
                        <SelectValue placeholder='Choose a status' />
                      </SelectTrigger>
                      <SelectContent id={"status"}>
                        <SelectGroup>
                          {Object.values(TaskStatus).map((option, id) => (
                            <SelectItem
                              value={option.toLowerCase()}
                              key={id + option}
                              {...form.register("status")}
                            >
                              {option}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </form>
              </Form>
              <SheetFooter>
                <SheetClose asChild>
                  <Button type='submit'>Save your new task</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
        </NavigationMenuList>
      </NavigationMenu>
    </CardHeader>
  );
};
export default ProjectCardHeader;
