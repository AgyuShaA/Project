import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";
import { loggerUtil } from "@/pkg/utils/logger";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  try {
    const messages = (await import(`./text/${locale}.json`)).default;

    return { locale, messages };
  } catch (err) {
    loggerUtil({
      text: "[next-intl] failed to load messages for locale",
      value: err,
    });
    throw err;
  }
});
