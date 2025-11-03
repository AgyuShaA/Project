"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import { SortOrder } from "../../entities/models";
import { Skeleton } from "../../shared/ui/skeleton";

const PostListFilters = dynamic(() =>
  import("@/app/(client)/(app)/features/post/post-filters").then(
    (m) => m.PostListFilters
  )
);

const PostList = dynamic(() =>
  import("@/app/(client)/(app)/features/post/post-list").then((m) => m.PostList)
);

export default function PostComponent() {
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<SortOrder>(SortOrder.IdDesc);

  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <PostListFilters
        search={search}
        sortOrder={sortOrder}
        setSearch={setSearch}
        setSortOrder={setSortOrder}
      />

      <Suspense
        fallback={
          <>
            <Skeleton />
          </>
        }
      >
        <PostList search={search} sortOrder={sortOrder} />
      </Suspense>
    </div>
  );
}
