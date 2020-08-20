import axios from 'axios';

import { LoginDto, Tokens, RegisterDto } from "MyModels";

export async function login(loginDto: LoginDto): Promise<Tokens> {
  const res = await axios.post<Tokens | Error>('/api/v1/auth/login', {...loginDto});
  return res.data
}

export async function register(registerDto: RegisterDto): Promise<any> {
  const res = await axios.post('/api/v1/users/register', registerDto)
  return res.data;
}

export async function refreshToken(jwtRefreshToken: string): Promise<Tokens> {
  const res = await axios.post('/api/v1/auth/login/token/refresh', {
    refresh_token: jwtRefreshToken
  })
  console.log(res);
  return res.data;
}
