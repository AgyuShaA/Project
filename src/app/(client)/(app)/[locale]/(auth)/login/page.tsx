'use cache'

import { FC } from 'react'
import { LoginFormComponent } from '@/app/(client)/(app)/features/login/login-form'
import { routing } from '@/pkg/libraries/locale/routing'
import { setRequestLocale } from 'next-intl/server'

import { Locale } from 'next-intl'

export function generateStaticParams() {
  const locales = routing.locales

  return locales.map((locale) => ({
    locale,
  }))
}

interface IProps {
  params: Promise<{ locale: Locale }>
}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  return <LoginFormComponent />
}

export default Page
