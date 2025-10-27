import { mutationOptions } from "@tanstack/react-query";

import { credentialsLogin, credentialsRegister } from "./auth.api";
import { ILogin, IRegister } from "../../models";

export const loginMutationOptions = () => {
  return mutationOptions({
    mutationFn: (loginData: ILogin) => credentialsLogin(loginData),
    onError: (error) => {
      console.error(error);
      return error;
    },
  });
};

export const registerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (registerData: IRegister) => credentialsRegister(registerData),

    onError: (error) => {
      console.error(error);
    },
  });
};
