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
import { login, loginWithGoogle } from "@/core/use-cases/auth/login";
import { useAppDispatch /* useAppSelector */ } from "@/infra/store/reduxStore";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
//import axios from "axios";

export function LoginForm() {
  //const isAuth = useAppSelector((state) => state.auth.isAuth);
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

    const result = await dispatch(login(values));
    if (login.fulfilled.match(result)) {
      navigate("/dashboard");
      form.reset();
    }
  };

  const responseMessage = async (googleResponse: CredentialResponse) => {
    /* //const credentials = jwtDecode(googleResponse.credential!);

    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/signin/google`,
      { token: googleResponse.credential! },
    );
    console.log(response); */ try {
      await dispatch(loginWithGoogle(googleResponse.credential!));
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const errorMessage = () => {
    console.log("Login fail");
  };

  return (
    <Card className='w-4/5 md:w-1/2 h-min mx-auto'>
      <CardHeader>
        <CardTitle>Connexion</CardTitle>
        <CardDescription>Connect to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            data-testid='loginForm'
            onSubmit={form.handleSubmit(handleSubmit)}
            className=''
          >
            <LoginFormFields form={form} />
            {form.formState.errors && (
              <p className='text-destructive'>
                {form.formState.errors.root?.message}
              </p>
            )}
            <SubmitButton text='Se connecter' testId='loginButton' />
          </form>
        </Form>
        <div className='flex justify-between my-5'>
          <div className='h-1 border-t my-auto w-full' />
          <span className='text-center px-4 font-bold text-3xl'>Or</span>
          <div className='h-1 border-t my-auto w-full' />
        </div>
        <div className='flex justify-center mt-3'>
          <GoogleLogin
            type='standard'
            shape='pill'
            theme='outline'
            onSuccess={responseMessage}
            onError={errorMessage}
          />
        </div>
      </CardContent>
    </Card>
  );
}
