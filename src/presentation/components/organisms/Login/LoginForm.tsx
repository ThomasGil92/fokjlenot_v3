import LoginFormFields from "../../molecules/Login/LoginFields";
import SubmitButton from "../../atoms/shared/SubmitButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/shadcn/components/ui/card";
import { z } from "zod";
import { Form } from "@/presentation/shadcn/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { login } from "@/core/use-cases/auth/login";
import { useAppDispatch } from "@/infra/store/reduxStore";

export function LoginForm() {
  const navigate = useNavigate();
  const dispatch=useAppDispatch()

  const formSchema = z.object({
    email: z
      .string()
      .min(1, { message: "This field has to be filled." })
      .email("This is not a valid email."),
    password: z
      .string()
      .min(4, { message: "Your password should have 4 character min" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "test2@gmail.com",
      password: "HelloPapy98!",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();
   
    await dispatch(login(values));
    navigate("/dashboard");
    form.reset();
  };

  return (
    <Card className='w-1/2 h-min mx-auto'>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Connect to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form data-testid="loginForm" onSubmit={form.handleSubmit(handleSubmit)} className=''>
            <LoginFormFields form={form} />
            <SubmitButton text='Se connecter' testId="loginButton" />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
