import {
  filter,
  merge, mergeMapTo,
  take,
  takeUntil, tap,
} from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { refreshTokenAsync } from '../features/auth/actions';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { RootState, RootAction } from 'MyTypes';
import { isActionOf } from 'typesafe-actions';

export function handle401Error(
  action$: ActionsObservable<RootAction>,
  state$: StateObservable<RootState>,
  source: Observable<any>
): Observable<any> {
  const { refresh_token } = state$.value.auth.tokens;
  return action$.pipe(
    filter(isActionOf(refreshTokenAsync.success)),
    takeUntil(action$.pipe(filter(isActionOf(refreshTokenAsync.failure)))),
    take(1),
    tap(what => console.log(what, source)),
    mergeMapTo(source),
    tap(res => console.log(res)),
    merge(of(refreshTokenAsync.request(refresh_token))) // Try to refresh token
  );
}
