'use client'
import { Suspense, type FC } from 'react'
import { ContainerComponent } from '../../shared/ui/container'
import dynamic from 'next/dynamic'
import { Skeleton } from '../../shared/ui/skeleton'

interface PostModuleProps {
  id: string
}

const PostIdComponent = dynamic(() => import('../../widgets/post-id').then((m) => m.PostIdComponent), { ssr: false })

const PostIdModule: FC<PostModuleProps> = ({ id }) => {
  return (
    <ContainerComponent className='w-full space-y-12 pb-[72px]'>
      <Suspense
        fallback={
          <>
            <Skeleton />
          </>
        }
      >
        <PostIdComponent id={id} />
      </Suspense>
    </ContainerComponent>
  )
}

export default PostIdModule
