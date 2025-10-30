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
import Link from "next/link";
import { useTranslations } from "next-intl";
import { toast } from "react-toastify";

export default function LoginFormComponent() {
  const t = useTranslations("login");
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
      const res = await login(data);
      console.log(res);
      console.log(errors);

      if (res.success) {
        router.push("/");
      } else if (res?.error?.message) {
        setError("root", {
          message: res.error.message,
        });
      }
    } catch (error: unknown) {
      toast.error(error as string);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex min-w-[60%] md:min-w-[35%] flex-col items-center justify-center max-w-md mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white"
        >
          <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

          <FormField
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("email")}</FormLabel>

                <FormControl>
                  <Input type="email" placeholder={t("email")} {...field} />
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
                <FormLabel>{t("password")}</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("password")}
                    {...field}
                  />
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
            {isPending ? t("signingIn") : t("signInButton")}
          </Button>

          <p className="text-sm mt-2">
            {t("noAccount")}

            <Link href="/register" className="text-blue-600 hover:underline">
              {t("register")}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
