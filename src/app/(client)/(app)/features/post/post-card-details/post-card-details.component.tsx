"use client";

import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContentComponent,
  CardHeaderComponent,
  CardTitleComponent,
} from "../../../shared/ui/card";
import { postQueryOptionsById } from "../../../entities/api/post";
import { Post } from "../../../entities/models";

interface PostCardProps {
  id: string;
  showButton?: boolean;
}

export default function PostCardDetails({ id }: PostCardProps) {
  const { data: post } = useQuery<Post>(postQueryOptionsById(id));

  return (
    <Card className="flex flex-col items-center gap-4 rounded-lg border border-gray-200 p-6 shadow-sm">
      <CardHeaderComponent className="text-center text-xl font-bold">
        <CardTitleComponent>{post?.title}</CardTitleComponent>
      </CardHeaderComponent>

      <CardContentComponent>
        <p className="text-center text-gray-700">{post?.body}</p>
      </CardContentComponent>
    </Card>
  );
}
