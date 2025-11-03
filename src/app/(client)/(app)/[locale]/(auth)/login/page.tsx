import { Suspense } from "react";

import { LoginFormComponent } from "@/app/(client)/(app)/features/login/login-form";
import { routing } from "@/pkg/libraries/locale/routing";
import { setRequestLocale } from "next-intl/server";
import { Skeleton } from "../../../shared/ui/skeleton";

export function generateStaticParams() {
  const locales = routing.locales;

  return locales.map((locale) => ({
    locale,
  }));
}

async function Login(props: PageProps<"/[locale]/login">) {
  "use cash";

  const { locale } = await props.params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={<Skeleton />}>
      <LoginFormComponent />
    </Suspense>
  );
}

export default Login;
