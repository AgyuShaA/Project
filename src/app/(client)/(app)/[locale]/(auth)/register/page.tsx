import { Suspense } from "react";

import { routing } from "@/pkg/libraries/locale/routing";
import RegisterFormComponent from "@/app/(client)/(app)/features/register/register-form/register-form.component";
import { setRequestLocale } from "next-intl/server";
import { Skeleton } from "../../../shared/ui/skeleton";

export function generateStaticParams() {
  const locales = routing.locales;

  return locales.map((locale) => ({
    locale,
  }));
}

async function Register(props: PageProps<"/[locale]/register">) {
  "use cash";

  const { locale } = await props.params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={<Skeleton />}>
      <RegisterFormComponent />
    </Suspense>
  );
}

export default Register;
