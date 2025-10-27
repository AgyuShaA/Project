"use client";

import Link from "next/link";
import { Post } from "@/app/(client)/(app)/entities/models";
import {
  Card,
  CardContentComponent,
  CardFooterComponent,
  CardHeaderComponent,
  CardTitleComponent,
} from "../card";
import { Button } from "../button";
import { useTranslations } from "next-intl";

interface PostCardProps {
  post: Post;
  showButton?: boolean;
}

export default function PostCard({ post, showButton = true }: PostCardProps) {
  const t = useTranslations("posts");

  return (
    <Card className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 p-6 shadow-sm">
      <CardHeaderComponent className="text-center w-full">
        <CardTitleComponent>{post.title}</CardTitleComponent>
      </CardHeaderComponent>

      <CardContentComponent>
        <p className="text-center text-gray-700">{post.body}</p>
      </CardContentComponent>

      <CardFooterComponent>
        <Link href={`/${post.id}`}>
          <Button className="cursor-pointer" variant="default">
            {t("viewPost")}
          </Button>
        </Link>
      </CardFooterComponent>
    </Card>
  );
}
