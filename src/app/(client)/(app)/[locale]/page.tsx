import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { cacheLife } from "next/cache";

import { getQueryClient } from "@/pkg/libraries/rest-api/service";
import { postQueryOptions } from "@/app/(client)/(app)/entities/api/post";
import { HomeModule } from "@/app/(client)/(app)/modules/home";
import { routing } from "@/pkg/libraries/locale/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default function Home() {
  "use cache";
  cacheLife("default");

  const queryClient = getQueryClient();
  queryClient.prefetchQuery(postQueryOptions());
  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <Suspense fallback={<p>Loading posts...</p>}>
        <HomeModule />
      </Suspense>
    </HydrationBoundary>
  );
}
