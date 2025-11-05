import { FC, Suspense } from "react";

import { LoginFormComponent } from "@/app/(client)/(app)/features/login/login-form";
import { routing } from "@/pkg/libraries/locale/routing";
import { setRequestLocale } from "next-intl/server";
import { Skeleton } from "../../../shared/ui/skeleton";
import { Locale } from "next-intl";

export function generateStaticParams() {
  const locales = routing.locales;

  return locales.map((locale) => ({
    locale,
  }));
}

interface IProps {
  params: Promise<{ locale: Locale }>;
}

const Page: FC<Readonly<IProps>> = async (props) => {
  "use cash";

  const { locale } = await props.params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={<Skeleton />}>
      <LoginFormComponent />
    </Suspense>
  );
}

export default Page;
