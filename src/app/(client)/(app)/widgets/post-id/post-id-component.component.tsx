"use client";

import Link from "next/link";
import { Button } from "../../shared/ui/button";
import { useTranslations } from "next-intl";
import { useQuery } from "@tanstack/react-query";
import { Post } from "../../entities/models";
import { postQueryOptionsById } from "../../entities/api/post";
import { PostCard } from "../../shared/ui/post-card";

interface PostIdComponentProps {
  id: string;
}

export default function PostIdComponent({ id }: PostIdComponentProps) {
  const { data: post } = useQuery<Post>(postQueryOptionsById(id));
  const t = useTranslations("posts");

  if (!post) return null;
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-4">
      <PostCard post={post} showButton={false} />

      <div className="flex items-center justify-center">
        <Link href="/">
          <Button className="cursor-pointer" variant="default">
            {t("backToAll")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
