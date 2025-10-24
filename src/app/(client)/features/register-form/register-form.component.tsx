"use client";

import { useState } from "react";
import { authClient } from "@/pkg/integrations/better-auth/lib/auth-client";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/client/shared/ui/form";
import { Input } from "../../shared/ui/input";
import { Button } from "../../shared/ui/button";
import { useForm } from "react-hook-form";
import { redirect } from "@/pkg/libraries/locale/navigation";
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
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: IRegisterForm) => {
    try {
      const response = await register(data);

      if (response.success) {
        router.push("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex min-w-[30%] items-center justify-center flex-col  max-w-md mx-auto p-6 border rounded-lg shadow-sm space-y-4"
        >
          <FormField
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>

                <FormControl>
                  <Input placeholder="Your full name" {...field} />
                </FormControl>
              </FormItem>
            )}
          />

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
            {isPending ? "Signing up…" : "Sign Up"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
