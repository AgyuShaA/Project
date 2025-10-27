"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/(client)/(app)/shared/ui/form";
import { Input } from "../../../shared/ui/input";
import { Button } from "../../../shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, LoginFormSchema } from "./login-form.interface";
import { useMutation } from "@tanstack/react-query";
import { loginMutationOptions } from "../../../entities/api/auth/auth.mutations";
import { useRouter } from "next/navigation";

export default function LoginFormComponent() {
  const { mutateAsync: login, isPending } = useMutation(loginMutationOptions());
  const router = useRouter();
  const form = useForm<ILoginForm>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: ILoginForm) => {
    try {
      await login(data);
      router.push("/");
    } catch (error: any) {
      if (error?.response?.data?.message) {
        const message = error.response.data.message;

        if (message.toLowerCase().includes("email")) {
          setError("email", { message });
        } else if (message.toLowerCase().includes("password")) {
          setError("password", { message });
        } else {
          setError("root", { message });
        }
      } else {
        setError("root", {
          message: "Something went wrong. Please try again.",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-w-[30%] flex-col items-center justify-center max-w-md mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
                <FormMessage className="text-sm text-red-500">
                  {errors.email?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
                <FormMessage className="text-sm text-red-500">
                  {errors.password?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
