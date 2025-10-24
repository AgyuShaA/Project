import dynamic from "next/dynamic";

import Link from "next/link";
import { Button } from "../../shared/ui/button";
import { Suspense } from "react";

const PostCardDynamic = dynamic(() =>
  import("@/client/features/post").then((m) => m.PostCardDynamic)
);

interface PostIdComponentProps {
  id: string;
}

export default function PostIdComponent({ id }: PostIdComponentProps) {
  return (
    <Suspense fallback={<a>loading...</a>}>
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        <PostCardDynamic id={id} showButton={false} />

        <div className="flex items-center justify-center">
          <Link href="/">
            <Button variant="default">Back to All Posts</Button>
          </Link>
        </div>
      </div>
    </Suspense>
  );
}
