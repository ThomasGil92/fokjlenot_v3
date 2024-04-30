import { UseFormReturn } from "react-hook-form";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/presentation/shadcn/components/ui/form";
import { Input } from "@/presentation/shadcn/components/ui/input";

interface LoginFieldsInterface {
  form: UseFormReturn<
    {
      email: string;
      password: string;
    },
    unknown,
    undefined
  >;
}

const LoginFields: React.FC<LoginFieldsInterface> = ({ form }) => {
  return (
    <>
      <FormField
        name="email"
        //control={control}
        render={({ field }) => {
          return (
            <FormItem className='mb-5'>
              <FormLabel htmlFor={`#${field.name}`}>Email:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...form.register(field.name)}
                  type='email'
                  placeholder='Email address'
                  id={field.name}
                  data-testid='emailInput'
                />
              </FormControl>
              <FormDescription>"example@gmail.com"</FormDescription>

              <FormMessage />
            </FormItem>
          );
        }}
      />
      <FormField
        name="password"
        //control={control}
        render={({ field }) => {
          return (
            <FormItem className='mb-5'>
              <FormLabel htmlFor={`#${field.name}`}>Password:</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  {...form.register(field.name)}
                  type='password'
                  placeholder='Password'
                  id={field.name}
                  data-testid='passwordInput'
                />
              </FormControl>
              <FormDescription>"********"</FormDescription>

              <FormMessage />
            </FormItem>
          );
        }}
      />

      
    </>
  );
};

export default LoginFields;
