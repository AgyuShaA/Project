import { ILogin, ILoginResponse, IRegister, IRegisterResponse } from '@/app/(client)/(app)/entities/models'
import { authClient } from '@/pkg/integrations/better-auth/lib/auth-client'

export async function credentialsLogin(loginData: ILogin): Promise<ILoginResponse> {
  try {
    const res = await authClient.signIn.email({
      email: loginData.email,
      password: loginData.password,
    })

    if (res.data) {
      return { success: true }
    } else {
      return {
        success: false,
        error: {
          message: res.error.message || 'Somthing went wrong',
          statusCode: 500,
        },
      }
    }
  } catch (error) {
    return {
      success: false,
      error: { message: (error as Error).message, statusCode: 500 },
    }
  }
}

export async function credentialsRegister(registerData: IRegister): Promise<IRegisterResponse> {
  try {
    await authClient.signUp.email({
      name: registerData.name,
      email: registerData.email,
      password: registerData.password,
    })

    return { success: true }
  } catch (error) {
    return {
      success: false,
      error: { message: (error as Error).message, statusCode: 500 },
    }
  }
}
