import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

import { getQueryClient } from "@/pkg/libraries/rest-api/service";

import { postQueryOptions } from "@/app/(client)/entities/api/post";
import { HomeModule } from "@/app/(client)/modules/home";
import { routing } from "@/pkg/libraries/locale/routing";
import RegisterForm from "@/app/(client)/widgets/register/register-form.component";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const locales = routing.locales;

  return locales.map((locale) => ({
    locale,
  }));
}

export default async function Register() {
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <RegisterForm />
    </Suspense>
  );
}
