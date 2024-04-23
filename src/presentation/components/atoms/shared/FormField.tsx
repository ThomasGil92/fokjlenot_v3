import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/presentation/shadcn/components/ui/form";
import { Input } from "@/presentation/shadcn/components/ui/input";
import { Control } from "react-hook-form";
interface FormFieldInterface {
  type: string;
dataId:string;
  name: string;
  required: boolean;
  label: string;
  placeholder: string;
  control:Control<any>
  description_helper?:string;
}

const FormFieldZ = ({
  type,
  name,dataId,
  placeholder,
  label,
  control,
  description_helper,
}: FormFieldInterface) => {
  return (
    <>
      <FormField
        name={name}
        control={control}
        render={({ field }) => (
          <FormItem className='mb-5'>
            <FormLabel htmlFor={`#${name}`}>{label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                id={name}
                data-testid={dataId}
              />
            </FormControl>
            {description_helper && (
              <FormDescription>{description_helper}</FormDescription>
            )}
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default FormFieldZ;
