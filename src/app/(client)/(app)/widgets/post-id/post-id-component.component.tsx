"use client";

import dynamic from "next/dynamic";

import Link from "next/link";
import { Button } from "../../shared/ui/button";
import { Suspense } from "react";
import { useTranslations } from "next-intl";

const PostCardDynamic = dynamic(
  () =>
    import("@/app/(client)/(app)/features/post/post-card-dynamic").then(
      (m) => m.PostCardDetails
    ),
  { ssr: false }
);

interface PostIdComponentProps {
  id: string;
}

export default function PostIdComponent({ id }: PostIdComponentProps) {
  const t = useTranslations("posts");

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <Suspense fallback={<a>loading...</a>}>
        <PostCardDynamic id={id} showButton={false} />
      </Suspense>

      <div className="flex items-center justify-center">
        <Link href="/">
          <Button className="cursor-pointer" variant="default">
            {" "}
            {t("backToAll")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
