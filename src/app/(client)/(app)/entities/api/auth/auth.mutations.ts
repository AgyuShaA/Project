import { mutationOptions } from '@tanstack/react-query'

import { credentialsLogin, credentialsRegister } from './auth.api'
import { ILogin, IRegister } from '../../models'
import { loggerUtil } from '@/pkg/utils/logger'

export const loginMutationOptions = () => {
  return mutationOptions({
    mutationFn: (loginData: ILogin) => credentialsLogin(loginData),

    onError: (error) => {
      loggerUtil({
        text: 'LoginMutationOptions',
        value: error.message,
      })
    },
  })
}

export const registerMutationOptions = () => {
  return mutationOptions({
    mutationFn: (registerData: IRegister) => credentialsRegister(registerData),

    onError: (error) => {
      loggerUtil({
        text: 'RegisterMutationOptions',
        value: error.message,
      })
    },
  })
}
