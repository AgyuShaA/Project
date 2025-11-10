'use cache'

import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { FC } from 'react'
import { getQueryClient } from '@/pkg/libraries/rest-api/service'
import { routing } from '@/pkg/libraries/locale/routing'
import { HomeModule } from '../modules/home'
import { postQueryOptions } from '../entities/api/post'
import { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

interface IProps {
  params: Promise<{ locale: Locale }>
}

const Page: FC<Readonly<IProps>> = async (props) => {
  const { locale } = await props.params

  setRequestLocale(locale)

  const queryClient = getQueryClient()
  queryClient.prefetchQuery(postQueryOptions())

  const dehydratedState = dehydrate(queryClient)

  return (
    <HydrationBoundary state={dehydratedState}>
      <HomeModule />
    </HydrationBoundary>
  )
}

export default Page
