"use client";

import { useState, useEffect } from "react";
import { Button } from "@/app/(client)/(app)/shared/ui/button";
import { authClient } from "@/pkg/integrations/better-auth/lib/auth-client";
import {
  Link,
  redirect,
  usePathname,
  useRouter,
} from "@/pkg/libraries/locale/navigation";
import { User } from "../../entities/models/user.model";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";

export default function Header() {
  const t = useTranslations("header");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const { data } = await authClient.getSession();
      setUser(
        data?.user
          ? { ...data.user, image: data.user.image ?? undefined }
          : null
      );
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
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

      {!loading && (
        <>
          {user ? (
            <>
              <div className="gap-10 flex items-center">
                <span>{user.name}</span>

                <Button
                  variant="outline"
                  className="cursor-pointer"
                  onClick={handleLogout}
                >
                  {t("logout")}
                </Button>
              </div>
            </>
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
        </>
      )}

      {/* Locale selector */}
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
