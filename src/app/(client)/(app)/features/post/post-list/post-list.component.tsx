"use client";

import { Post } from "@/app/(client)/(app)/entities/models/post.model";
import { PostCard } from "@/app/(client)/(app)/shared/ui/post-card";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { postQueryOptions } from "../../../entities/api/post";
import { usePostsFilterStore } from "../../../shared/store";

export default function PostList() {
  const { data: postsData } = useQuery(postQueryOptions());
  const { filteredPosts, setPosts } = usePostsFilterStore();

  useEffect(() => {
    if (postsData) setPosts(postsData);
  }, [postsData, setPosts]);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      {filteredPosts?.map((post: Post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
