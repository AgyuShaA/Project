import { FC, Suspense } from "react";

import { routing } from "@/pkg/libraries/locale/routing";
import RegisterFormComponent from "@/app/(client)/(app)/features/register/register-form/register-form.component";
import { setRequestLocale } from "next-intl/server";

interface IProps extends PageProps<"/[locale]/login"> {}

export function generateStaticParams() {
  const locales = routing.locales;

  return locales.map((locale) => ({
    locale,
  }));
}

const Register: FC<Readonly<IProps>> = async (props) => {
  "use cash";

  const { locale } = await props.params;

  setRequestLocale(locale);

  return (
    <Suspense fallback={<p>Loading form...</p>}>
      <RegisterFormComponent />
    </Suspense>
  );
};

export default Register;
