import { UseFormReturn } from "react-hook-form";
import { ProjectStatus } from "@/adapters/secondary/project/project";
import {
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

interface AddProjectFieldsInterface {
  form: UseFormReturn<
    {
      title: string;
      
      status: ProjectStatus;
      ownerId: string;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    undefined
  >;
}

const AddProjectFormFields: React.FC<AddProjectFieldsInterface> = ({
  form,
}) => {
  const { register } = form;
  return (
    <>
      <FormField
        name={"title"}
        render={({ field }) => {
          return (
            <FormItem className='mb-5'>
              <FormLabel htmlFor={`#${field.name}`}>Title:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...register(field.name)}
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
                        {...register(field.name)}
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
    </>
  );
};

export default AddProjectFormFields;
