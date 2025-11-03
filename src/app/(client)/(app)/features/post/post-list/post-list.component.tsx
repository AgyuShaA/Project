"use client";

import { Post } from "@/app/(client)/(app)/entities/models/post.model";
import { PostCard } from "@/app/(client)/(app)/shared/ui/post-card";

import { useQuery } from "@tanstack/react-query";
import { postQueryOptions } from "../../../entities/api/post";
import { SortOrder } from "../../../entities/models";
import { Spinner } from "../../../shared/ui/spinner";

interface PostListProps {
  search: string;
  sortOrder: SortOrder;
}

export default function PostList({ search, sortOrder }: PostListProps) {
  const { data: posts = [], isLoading } = useQuery({
    ...postQueryOptions(),
    select: (data) => {
      const filtered = data.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase())
      );

      return filtered.sort((a, b) => {
        switch (sortOrder) {
          case SortOrder.IdAsc:
            return a.id - b.id;

          case SortOrder.IdDesc:
            return b.id - a.id;

          case SortOrder.TitleAsc:
            return a.id - b.id;

          case SortOrder.TitleDesc:
            return b.id - a.id;
          default:
            return 0;
        }
      });
    },
  });

  if (isLoading)
    return (
      <>
        <Spinner />
      </>
    );

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {posts.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
