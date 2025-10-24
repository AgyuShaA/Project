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
import { LoginFormSchema } from "./login-form.interface";

export default function LoginFormComponent() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginFormSchema),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setLoading(true);
    setErrorMsg("");

    await authClient.signIn.email(
      {
        email: values.email,
        password: values.password,

        rememberMe: true,
      },
      {
        onSuccess: () => redirect({ href: "/", locale: "en" }),
        onError: (ctx) => setErrorMsg(ctx.error.message),
      }
    );

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
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

          <Button type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In"}
          </Button>

          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </form>
      </Form>
    </div>
  );
}
