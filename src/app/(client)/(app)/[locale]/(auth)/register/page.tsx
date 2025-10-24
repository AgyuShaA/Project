import { Suspense } from "react";

import { routing } from "@/pkg/libraries/locale/routing";
import RegisterFormComponent from "@/app/(client)/features/register/register-form.component";

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
      <RegisterFormComponent />
    </Suspense>
  );
}
