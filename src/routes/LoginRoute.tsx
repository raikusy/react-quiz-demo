import {
  Button,
  Card,
  Center,
  Container,
  Space,
  TextInput,
} from "@mantine/core";

import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useAuthService } from "../hooks/useAuthRoles";
import { Navigate, useNavigate } from "react-router-dom";

export interface ILoginFormInput {
  username: string;
  password: string;
}

const schema = yup
  .object({
    username: yup.string().required("Username is required"),
    password: yup.string().required("Password is required"),
  })
  .required();

const LoginRoute = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormInput>({
    resolver: yupResolver(schema),
  });
  const { mutateAsync, isLoggedIn, user } = useAuthService();

  const navigate = useNavigate();

  const handleLogin: SubmitHandler<ILoginFormInput> = async (
    data: ILoginFormInput
  ) => {
    try {
      await mutateAsync(data);
      navigate("/", { replace: true });
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoggedIn && user?.role) {
    return <Navigate to="/" />;
  }

  return (
    <Container>
      <Center sx={{ minHeight: "100vh", fontSize: "1.4rem" }}>
        <Card shadow="sm" padding="lg">
          <form onSubmit={handleSubmit(handleLogin)}>
            <TextInput
              placeholder="Your username"
              label="Username"
              required
              error={errors?.username?.message}
              {...register("username", { required: true })}
            />
            <Space h="md" />
            <TextInput
              placeholder="Your password"
              label="Password"
              required
              error={errors?.password?.message}
              {...register("password", { required: true })}
            />
            <Space h="md" />
            <Button variant="filled" fullWidth type="submit">
              Submit
            </Button>
          </form>
        </Card>
      </Center>
    </Container>
  );
};

export default LoginRoute;
