export interface IRegister {
  name: string;
  email: string;
  password: string;
  callbackURL?: string;
}

export interface IResponse<T> {
  success: boolean;
  error?: IResponseError;
  result?: T;
}

export interface IResponseError {
  message: string;
  statusCode: number;
}

export interface IRegisterResponse extends IResponse<void> {}

export interface ILogin {
  email: string;
  password: string;
  callbackURL?: string;
}

export interface ILoginResponse extends IResponse<void> {}
