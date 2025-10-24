export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

export const apiEndpoint = 'https://jsonplaceholder.typicode.com/posts'
