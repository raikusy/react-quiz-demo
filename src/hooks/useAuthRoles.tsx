import constate from "constate";
import axios from "axios";
import { useMutation } from "react-query";
import { useLocalStorageValue } from "@mantine/hooks";
import { IUserObject } from "../interfaces/user";
import { ILoginFormInput } from "../routes/LoginRoute";

interface ILoginSuccess {
  user: IUserObject;
}

// interface IAuthState extends ILoginSuccess {
//   isLoggedIn: boolean;
// }

const useAuthRoles = () => {
  const loginApiFn = async (body: ILoginFormInput) => {
    const response = await axios.post<ILoginSuccess>("/api/login", body);

    return response?.data?.user;
  };

  const [localState, setLocalState] = useLocalStorageValue({
    key: "rqt-auth-state",
    defaultValue: JSON.stringify({
      isLoggedIn: false,
      user: undefined,
    }),
  });

  const mutation = useMutation<IUserObject, any, ILoginFormInput, any>(
    loginApiFn,
    {
      onSuccess: (data) => {
        setLocalState(JSON.stringify({ isLoggedIn: true, user: data }));
      },
    }
  );

  const parsedState = JSON.parse(localState);
  const isLoggedIn: boolean = parsedState?.isLoggedIn;
  const user: IUserObject = parsedState?.user;

  const handleLogout = () => {
    setLocalState(
      JSON.stringify({
        isLoggedIn: false,
        user: undefined,
      })
    );
  };

  return {
    isLoggedIn,
    user,
    handleLogout,
    ...mutation,
  };
};

export const [AuthProvider, useAuthService] = constate(useAuthRoles);
