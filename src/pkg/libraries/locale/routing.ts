import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'ua'],

  localePrefix: 'as-needed',
  localeDetection: true,
  defaultLocale: 'en',
})
