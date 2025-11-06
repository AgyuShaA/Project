export interface IRegister {
  name: string
  email: string
  password: string
  callbackURL?: string
}

export interface IResponse<T> {
  success: boolean
  error?: IResponseError
  result?: T
}

export interface IResponseError {
  message: string
  statusCode: number
}

export interface ApiError {
  response?: {
    data?: {
      message?: string
    }
  }
}

export type IRegisterResponse = IResponse<void>

export interface ILogin {
  email: string
  password: string
  callbackURL?: string
}

export type ILoginResponse = IResponse<void>
