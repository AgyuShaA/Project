"use client";

import dynamic from "next/dynamic";

const PostListFilters = dynamic(() =>
  import("@/app/(client)/(app)/features/post/post-filters").then(
    (m) => m.PostListFilters
  )
);

const PostList = dynamic(
  () =>
    import("@/app/(client)/(app)/features/post/post-list").then(
      (m) => m.PostList
    ),
  { ssr: false }
);

export default function PostComponent() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <PostListFilters />

      <PostList />
    </div>
  );
}
