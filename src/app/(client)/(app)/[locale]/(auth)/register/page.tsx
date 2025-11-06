import { FC, Suspense } from "react";
import { routing } from "@/pkg/libraries/locale/routing";
import RegisterFormComponent from "@/app/(client)/(app)/features/register/register-form/register-form.component";
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
      <RegisterFormComponent />
  );
}

export default Page;
