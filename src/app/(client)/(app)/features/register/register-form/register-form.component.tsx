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
import { IRegisterForm, RegisterFormSchema } from "./register-form.interface";
import { registerMutationOptions } from "../../../entities/api/auth/auth.mutations";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useTranslations } from "next-intl";

import { toast } from "react-toastify";

export default function RegisterFormComponent() {
  const t = useTranslations("register");
  const { mutateAsync: register, isPending } = useMutation(
    registerMutationOptions()
  );
  const router = useRouter();

  const form = useForm<IRegisterForm>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
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
      } else if (response?.error?.message) {
        setError(response.error.message as keyof IRegisterForm, {
          message: response.error.message,
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
          className="flex min-w-[60%] md:min-w-[40%]  flex-col items-center justify-center max-w-md mx-auto p-6 border rounded-lg shadow-sm space-y-4 bg-white"
        >
          <h1 className="text-2xl font-bold mb-4">{t("title")}</h1>

          <FormField
            name="name"
            control={form.control}
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("name")}</FormLabel>

                <FormControl>
                  <Input placeholder={t("name")} {...field} />
                </FormControl>

                <FormMessage className="text-sm text-red-500">
                  {errors.name?.message}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            name="email"
            control={form.control}
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
            control={form.control}
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

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel>{t("password")}</FormLabel>

                <FormControl>
                  <Input
                    type="password"
                    placeholder={t("confirm_password")}
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

          <Button type="submit">
            {isPending ? t("signingUp") : t("signUpButton")}
          </Button>

          <p className="text-sm mt-2">
            {t("haveAccount")}

            <Link href="/login" className="text-blue-600 hover:underline">
              {t("login")}
            </Link>
          </p>
        </form>
      </Form>
    </div>
  );
}
