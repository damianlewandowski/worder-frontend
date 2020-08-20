import {
  catchError,
  filter,
  ignoreElements,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {isActionOf} from 'typesafe-actions';
import { from, of } from 'rxjs';

import {loginAsync, logout, refreshTokenAsync} from './actions';
import { RootEpic } from 'MyTypes';

export const loginEpic$: RootEpic = (action$, state$, { api, toast }) =>
  action$.pipe(
    filter(isActionOf(loginAsync.request)),
    switchMap(action =>
      from(api.auth.login(action.payload)).pipe(
        map(loginAsync.success),
        catchError(err => {
          toast.error(err.response.data.message);
          return of(loginAsync.failure(err.response.data));
        })
      )
    )
  );

export const persistTokensInLocalStorage$: RootEpic = (
  action$,
  state$,
  { localStorage }
) =>
  action$.pipe(
    filter(isActionOf([loginAsync.success, refreshTokenAsync.success])),
    tap(_ => {
      const localStorageState = localStorage.get('reduxState');
      const state = {
        ...localStorageState,
        auth: {
          ...state$.value.auth,
        },
      };
      localStorage.set('reduxState', state);
    }),
    ignoreElements()
  );

export const refreshTokenEpic$: RootEpic = (action$, state$, { api, toast }) =>
  action$.pipe(
    filter(isActionOf(refreshTokenAsync.request)),
    switchMap(action =>
      from(api.auth.refreshToken(action.payload)).pipe(
        map(refreshTokenAsync.success),
        catchError(err => {
          console.dir(err);
          toast.error(err.response.data.message);
          return of(refreshTokenAsync.failure(err.response.data));
        })
      )
    )
  );

export const logoutEpic$: RootEpic = (action$, state$, { localStorage }) =>
  action$.pipe(
    filter(isActionOf([refreshTokenAsync.failure, logout])),
    tap(action => {
      const localStorageState = localStorage.get('reduxState')
      const state = {
        ...localStorageState,
        auth: {
          tokens: {
            jwt_token: '',
            refresh_token: ''
          }
        },
      };
      localStorage.set('reduxState', state);
    }),
    ignoreElements()
  );
