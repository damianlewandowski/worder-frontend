import { combineReducers } from 'redux';
import {ActionType, createReducer} from 'typesafe-actions';
import { Tokens } from 'MyModels';

import * as actions from './actions';

export type AuthState = Readonly<{
  isLoadingAuth: boolean;
  tokens: Tokens
}>
export type AuthAction = ActionType<typeof actions>;

const initialState: AuthState = {
  isLoadingAuth: false,
  tokens: {
    jwt_token: '',
    refresh_token: ''
  }
}

// @ts-ignore
const reducer = combineReducers<AuthState, AuthAction>({
  isLoadingAuth: createReducer(initialState.isLoadingAuth)
    .handleAction([actions.loginAsync.request], (state, action) => true)
    .handleAction(
      [actions.loginAsync.success, actions.loginAsync.failure],
      (state, action) => false
    ),
  tokens: createReducer(initialState.tokens)
    .handleAction(
      [actions.loginAsync.success, actions.refreshTokenAsync.success],
      (state, action) => {
        return {
          ...state,
          ...action.payload
        }
      }
    )
    .handleAction(
      [actions.loginAsync.failure, actions.refreshTokenAsync.failure],
      (state, action) => ({
        ...state,
        error: action.payload,
      })
    )
    .handleAction(
      actions.logout,
      (state, action) => {
        return {
          ...state,
          jwt_token: '',
          refresh_token: ''
        }
      }
    )

});

export default reducer;
