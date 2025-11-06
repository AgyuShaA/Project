import ky, { type KyInstance } from 'ky'

export const restApiFetcher: KyInstance = ky.create({
  throwHttpErrors: false,
})
