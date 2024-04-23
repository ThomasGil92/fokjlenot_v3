import { UserCredential } from "@/core/use-cases/auth/auth";
import { HttpResponse, http } from "msw";
import { User } from "../../user/user";

const users: User[] = [
  {
    password: "password1234",
    email: "fakeEmail123@gmail.com",
    first_name: "Jhon",
    last_name: "Doe",
    id: "1",
  },
  {
    password: "4567",
    email: "fakeEmail123456@gmail.com",
    first_name: "Marl",
    last_name: "Boro",
    id: "2",
  },
];

const findUser = (
  email: UserCredential["email"],
  password: UserCredential["password"],
) => {
  return users.find(
    (user) => user?.email === email && user.password === password,
  );
};

export const authHandlers = [
  http.post(`/api/auth/login`, async (req) => {
    try {
      const { email, password } = (await req.request.json()) as UserCredential;
      const user = findUser(email, password);
      if (user) {
        return HttpResponse.json({
          token: {
            access_token: "access_token1234",
            refresh_token: "refresh_token1234",
          },
          user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            id: user.id,
          },
        });
      } else {
        throw new SyntaxError(
          "user not found, you must provide good credentials",
        );
      }
    } catch (error) {
      return HttpResponse.json(
        {
          error: error instanceof SyntaxError ? error.message : error,
        },
        { status: 401 },
      );
    }
  }),
];
