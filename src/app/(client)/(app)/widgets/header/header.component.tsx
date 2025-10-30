"use client";

import { Button } from "@/app/(client)/(app)/shared/ui/button";
import { authClient } from "@/pkg/integrations/better-auth/lib/auth-client";
import {
  Link,
  redirect,
  usePathname,
  useRouter,
} from "@/pkg/libraries/locale/navigation";

import { useTranslations, useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const { data, isPending } = authClient.useSession();

  const handleLogout = async () => {
    await authClient.signOut();
    redirect({ href: "/", locale }); // keep current locale
  };

  const changeLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <header className="w-full flex items-center justify-between p-4 bg-white shadow-sm">
      <Link href="/">
        <h1 className="text-xl font-bold">{t("appName")}</h1>
      </Link>

      {data?.user ? (
        <>
          <div className="gap-10 flex items-center">
            <span>{data.user.name}</span>

            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handleLogout}
            >
              {t("logout")}
            </Button>
          </div>
        </>
      ) : isPending ? (
        <p>Loading..</p>
      ) : (
        <>
          <div className="gap-10 flex">
            <Link href="/register">
              <Button className="cursor-pointer">{t("register")}</Button>
            </Link>

            <Link href="/login">
              <Button variant="outline" className="cursor-pointer">
                {t("login")}
              </Button>
            </Link>
          </div>
        </>
      )}

      <select
        value={locale}
        onChange={(e) => changeLocale(e.target.value)}
        className="border border-gray-300 rounded px-2 py-1"
      >
        <option value="en">English</option>
        <option value="ua">Українська</option>
      </select>
    </header>
  );
}
