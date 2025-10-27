"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/app/(client)/(app)/shared/ui/form";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { IRegisterForm, RegisterFormSchema } from "./register-form.interface";
import { registerMutationOptions } from "../../entities/api/auth/auth.mutations";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export default function RegisterFormComponent() {
  const { mutateAsync: register, isPending } = useMutation(
    registerMutationOptions()
  );
  const router = useRouter();

  const form = useForm<IRegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterFormSchema),
  });

  const {
    handleSubmit,
    setError,
    formState: { errors },
  } = form;

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const response = await register(data);

      if (response.success) {
        router.push("/");
      } else if (response?.error) {
        if (response.error.message && response.error.message) {
          setError(response.error.message as keyof IRegisterForm, {
            message: response.error.message,
          });
        } else {
          setError("root", { message: response.error.message });
        }
      }
    } catch (error: any) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

      if (message.toLowerCase().includes("email")) {
        setError("email", { message });
      } else if (message.toLowerCase().includes("password")) {
        setError("password", { message });
      } else if (message.toLowerCase().includes("name")) {
        setError("name", { message });
      } else {
        setError("root", { message });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-w-[30%] items-center justify-center flex-col max-w-md mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
                <FormMessage className="text-sm text-red-500">
                  {errors.name?.message}
                </FormMessage>
              </FormItem>
            )}
          />

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
                  {errors.password?.message}{" "}
                </FormMessage>
              </FormItem>
            )}
          />

          {errors.root && (
            <p className="text-red-500 text-sm">{errors.root.message}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "Signing up…" : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
