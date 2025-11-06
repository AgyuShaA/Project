import { type FC } from 'react'
import { ContainerComponent } from '../../shared/ui/container'
import { PostComponent } from '../../widgets/post'

const HomeModule: FC = () => {
  return (
    <ContainerComponent className='w-full space-y-12 pb-[72px]'>
      <PostComponent />
    </ContainerComponent>
  )
}

export default HomeModule
