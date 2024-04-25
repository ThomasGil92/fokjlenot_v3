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
import { UseFormRegister } from "react-hook-form";

export type ValidFieldNames = "title" | "status";
export type FormData = {
  title: string;
  id: string;
  status: ProjectStatus;
  owner: string;
  collaborators: string[];
};
interface FormFieldInterface {
  type: string;
  dataId: string;
  name: ValidFieldNames;
  required: boolean;
  label: string;
  options?: string[];
  placeholder: string;
  register: UseFormRegister<FormData>;
  /* control: Control<
    {
      id: string;
      name:string;
      title: string;
      status: ProjectStatus;
      owner: string;
      collaborators: string[];
    },
    ZodAny
  >; */
  description_helper?: string;
}

const FormFieldZ = ({
  type,
  register,
  name,
  dataId,
  options,
  placeholder,
  label,
  //control,
  description_helper,
}: FormFieldInterface) => {
  return (
    <>
      <FormField
        name={name}
        //control={control}
        render={({ field }) => {
          return (
            <FormItem className='mb-5'>
              <FormLabel htmlFor={`#${name}`}>{label}</FormLabel>
              <FormControl>
                {!options ? (
                  <Input
                    {...field}
                    {...register(name)}
                    type={type}
                    placeholder={placeholder}
                    id={name}
                    data-testid={dataId}
                  />
                ) : (
                  <Select
                    onValueChange={field.onChange}
                    name={name}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className='w-[180px]'>
                      <SelectValue placeholder='Choose a status' />
                    </SelectTrigger>
                    <SelectContent id={name}>
                      {options.map((option, id) => (
                        <SelectItem
                          value={option.toLowerCase()}
                          key={id + option}
                          {...register(name)}
                        >
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              {description_helper && (
                <FormDescription>{description_helper}</FormDescription>
              )}
              <FormMessage />
            </FormItem>
          );
        }}
      />
    </>
  );
};

export default FormFieldZ;
