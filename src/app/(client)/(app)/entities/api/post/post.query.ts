import { queryOptions } from '@tanstack/react-query'
import postQueryApi from './post.api'
import { Post } from '../../models'

export const postQueryOptions = () => {
  return queryOptions({
    queryKey: ['posts'],
    queryFn: (params) => {
      const data = postQueryApi(params) as Promise<Post[]>

      return data
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
  })
}

export const postQueryOptionsById = (id: string) => {
  return queryOptions<Post, Error>({
    queryKey: ['post', id],
    queryFn: (params) => {
      const data = postQueryApi(params) as Promise<Post>

      return data
    },
    staleTime: 30_000,
    refetchInterval: 30_000,
  })
}
