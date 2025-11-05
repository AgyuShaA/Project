"use cache";

import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import { routing } from "@/pkg/libraries/locale/routing";
import { postQueryOptionsById } from "../../entities/api/post";
import { PostIdModule } from "../../modules/post";
import { Locale } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { FC } from "react";

export async function generateStaticParams() {
  const locales = routing.locales;

  const ids = Array.from({ length: 100 }, (_, i) => (i + 1).toString());

  const params: { locale: string; id: string }[] = [];

  for (const locale of locales) {
    for (const id of ids) {
      params.push({ locale, id });
    }
  }

  return params;
}

interface IProps {
  params: Promise<{ locale: Locale, id:string  }>
}

const Page: FC<Readonly<IProps>> = async ({params}) => {

  const { id, locale } = await params;

  setRequestLocale(locale);

  const queryClient = getQueryClient();

  queryClient.prefetchQuery(postQueryOptionsById(id));

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="mx-auto max-w-2xl space-y-4 p-4">
        <PostIdModule id={id} />
      </div>
    </HydrationBoundary>
  );
}
