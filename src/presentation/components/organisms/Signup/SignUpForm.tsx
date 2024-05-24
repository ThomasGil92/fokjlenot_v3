import { GoogleLogin, CredentialResponse } from "@react-oauth/google";

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
import axios from "axios";

const SignUpForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

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

  const responseMessage = async (googleResponse: CredentialResponse) => {
    //const credentials = jwtDecode(googleResponse.credential!);
    
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signup/google`,
      { token: googleResponse.credential! },
    );
    console.log(response)
  };
  const errorMessage = () => {
    console.log("Login fail");
  };

  return (
    <Card className='w-4/5 h-min mx-auto'>
      <CardHeader>
        <CardTitle>Signup</CardTitle>
        <CardDescription>Create an account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            data-testid='loginForm'
            onSubmit={form.handleSubmit(handleSubmit)}
            className=''
          >
            <LoginFormFields form={form} />
            <SubmitButton text='Se connecter' testId='signUpButton' />
          </form>
        </Form>

        <div className='text-center font-bold'>Or</div>
        <GoogleLogin
          type='icon'
          shape='circle'
          theme='filled_black'
          onSuccess={responseMessage}
          onError={errorMessage}
        />
      </CardContent>
    </Card>
  );
};
export default SignUpForm;
