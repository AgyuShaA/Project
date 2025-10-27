"use client";

import dynamic from "next/dynamic";

import Link from "next/link";
import { Button } from "../../shared/ui/button";
import { Suspense } from "react";

const PostCardDynamic = dynamic(
  () =>
    import("@/app/(client)/(app)/features/post/post-card-dynamic").then(
      (m) => m.PostCardDynamic
    ),
  { ssr: false }
);

interface PostIdComponentProps {
  id: string;
}

export default function PostIdComponent({ id }: PostIdComponentProps) {
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <Suspense fallback={<a>loading...</a>}>
        <PostCardDynamic id={id} showButton={false} />

        <div className="flex items-center justify-center">
          <Link href="/">
            <Button className="cursor-pointer" variant="default">
              Back to All Posts
            </Button>
          </Link>
        </div>
      </Suspense>
    </div>
  );
}
