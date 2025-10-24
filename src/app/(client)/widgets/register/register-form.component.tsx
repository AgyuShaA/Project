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

export default function RegisterFormComponent() {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    password: string;
  }) => {
    setLoading(true);
    setErrorMsg("");

    await authClient.signUp.email(
      {
        name: values.name,
        email: values.email,
        password: values.password,
        image:
          "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png",
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

          <Button type="submit" disabled={loading}>
            {loading ? "Signing up…" : "Sign Up"}
          </Button>

          {errorMsg && <p className="text-red-500">{errorMsg}</p>}
        </form>
      </Form>
    </div>
  );
}
