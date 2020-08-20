export type LoginDto = {
  email: string;
  password: string;
}

export type RegisterDto = {
  email: string;
  password: string;
}

export type Tokens = {
  jwt_token: string;
  refresh_token: string;
}
