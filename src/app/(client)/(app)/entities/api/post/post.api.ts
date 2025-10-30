import { notFound } from "next/navigation";
import { QueryFunctionContext } from "@tanstack/react-query";

import { apiEndpoint, Post } from "../../models";
import { restApiFetcher } from "@/pkg/libraries/rest-api/fetcher";
import { loggerUtil } from "@/pkg/utils/logger";

const postQueryApi = async ({ queryKey }: QueryFunctionContext) => {
  const [, id] = queryKey as [string, string | undefined];

  const url = id ? `${apiEndpoint}/${id}` : apiEndpoint;
  console.log("Request sent" + queryKey);
  try {
    const res = await restApiFetcher
      .get(url, {
        cache: "force-cache",
        next: { revalidate: 30 },
      })
      .json<Post | Post[]>();

    if (!res || (Array.isArray(res) && res.length === 0)) {
      notFound();
    }

    return res;
  } catch (err) {
    loggerUtil({
      text: "LoginMutationOptions",
      value: err,
    });
    throw err;
  }
};

export default postQueryApi;
