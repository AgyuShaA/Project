"use client";

import { useState, useEffect } from "react";

import { Button } from "@/client/shared/ui/button";
import { authClient } from "@/pkg/integrations/better-auth/lib/auth-client";
import { Link, redirect } from "@/pkg/libraries/locale/navigation";
import { User } from "../../entities/models/user.model";

export default function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      const { data } = await authClient.getSession();

      if (data?.user)
        setUser(
          data?.user
            ? { ...data.user, image: data.user.image ?? undefined }
            : null
        );
      else setUser(null);

      setLoading(false);
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await authClient.signOut();
    setUser(null);
    redirect({ href: "/", locale: "en" });
  };

  return (
    <header className="w-full flex items-center justify-between p-4 bg-white shadow-sm">
      <Link href="/">
        <h1 className="text-xl font-bold">MyApp</h1>
      </Link>

      {!loading && (
        <div className="flex items-center gap-4">
          {user ? (
            <>
              {user.image && (
                <img
                  src={user.image}
                  alt={user.name}
                  className="w-8 h-8 rounded-full object-cover"
                />
              )}

              <span>{user.name}</span>

              <Button variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/register">
                <Button>Register</Button>
              </Link>

              <Link href="/login">
                <Button variant="outline">Login</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  );
}
