import { FC, Suspense } from "react";

import { LoginFormComponent } from "@/app/(client)/(app)/features/login-form";
import { routing } from "@/pkg/libraries/locale/routing";
import { setRequestLocale } from "next-intl/server";

interface IProps extends PageProps<"/[locale]/login"> {}

export function generateStaticParams() {
  const locales = routing.locales;

  return locales.map((locale) => ({
    locale,
  }));
}

const Login: FC<Readonly<IProps>> = async (props) => {
  "use cash";

  const { locale } = await props.params;

  setRequestLocale(locale);
  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <LoginFormComponent />
    </Suspense>
  );
};

export default Login;
