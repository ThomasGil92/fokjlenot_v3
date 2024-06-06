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
import { useAppDispatch } from "@/infra/store/reduxStore";

import { signup, signupWithGoogle } from "@/core/use-cases/auth/signup";

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
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .regex(/[a-z]/, {
        message: "Le mot de passe doit contenir au moins une lettre minuscule",
      })
      .regex(/[A-Z]/, {
        message: "Le mot de passe doit contenir au moins une lettre majuscule",
      })
      .regex(/[0-9]/, {
        message: "Le mot de passe doit contenir au moins un chiffre",
      })
      .regex(/[^a-zA-Z0-9]/, {
        message: "Le mot de passe doit contenir au moins un symbole",
      }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: import.meta.env.MODE === "development" ? "test2@gmail.com" : "",
      password: import.meta.env.MODE === "development" ? "HelloPapy98!" : "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof formSchema>) => {
    // e.preventDefault();

    const result = await dispatch(signup(values));
    if (!signup.fulfilled.match(result)) {
      form.setError("email", {
        type: "custom",
        message: "Cet email est déja utilisé",
      });
    } else {
      navigate("/login");
      form.reset();
    }
  };

  const responseMessage = async (googleResponse: CredentialResponse) => {
    await dispatch(signupWithGoogle(googleResponse.credential!));
    navigate("/login");
  };
  const errorMessage = () => {
    console.log("An error has occured");
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
            <SubmitButton text='Créer mon compte' testId='signUpButton' />
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
