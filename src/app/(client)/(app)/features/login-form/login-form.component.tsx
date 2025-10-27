"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/app/(client)/(app)/shared/ui/form";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ILoginForm, LoginFormSchema } from "./login-form.interface";
import { useMutation } from "@tanstack/react-query";
import { loginMutationOptions } from "../../entities/api/auth/auth.mutations";
import { useRouter } from "next/navigation";

export default function LoginFormComponent() {
  const { mutateAsync: login, isPending } = useMutation(loginMutationOptions());
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: ILoginForm) => {
    try {
      const response = await login(data);
      console.log(response);

      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-w-[30%] flex-col items-center justify-center max-w-md mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white"
        >
          <FormField
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="Your email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <FormField
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="Password" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isPending}>
            {isPending ? "Signing in…" : "Sign In"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
