import { createAction, createAsyncAction} from 'typesafe-actions';
import { Tokens } from 'MyModels';
import { LoginDto } from './models';

export const loginAsync = createAsyncAction(
  'LOGIN_REQUEST',
  'LOGIN_SUCCESS',
  'LOGIN_FAILURE'
)<LoginDto, Tokens, string>();

export const logout = createAction('LOGOUT')();

export const refreshTokenAsync = createAsyncAction(
  'REFRESH_TOKEN_REQUEST',
  'REFRESH_TOKEN_SUCCESS',
  'REFRESH_TOKEN_FAILURE'
)<string, Tokens, string>();
