import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = requestLocale;

  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  try {
    const messages = (await import(`./text/${locale}.json`)).default;

    return { locale, messages };
  } catch (err) {
    console.error(
      "[next-intl] failed to load messages for locale",
      locale,
      err
    );
    throw err;
  }
});
