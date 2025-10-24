import { Suspense } from "react";

import { routing } from "@/pkg/libraries/locale/routing";
import { LoginFormComponent } from "@/app/(client)/features/login-form";

export const revalidate = 30;
export const dynamic = "force-static";

export async function generateStaticParams() {
  const locales = routing.locales;

  return locales.map((locale) => ({
    locale,
  }));
}

export default async function Login() {
  return (
    <Suspense fallback={<p>Loading posts...</p>}>
      <LoginFormComponent />
    </Suspense>
  );
}
