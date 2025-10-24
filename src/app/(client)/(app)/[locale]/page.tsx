import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { cacheLife } from "next/cache";

import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import { postQueryOptions } from "@/app/(client)/entities/api/post";
import { HomeModule } from "@/app/(client)/modules/home";
import { routing } from "@/pkg/libraries/locale/routing";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home() {
  "use cache";
  cacheLife("default");

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(postQueryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<p>Loading posts...</p>}>
        <HomeModule />
      </Suspense>
    </HydrationBoundary>
  );
}
