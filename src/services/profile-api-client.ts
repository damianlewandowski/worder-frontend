import { Profile } from 'MyModels';
import { Observable } from 'rxjs';
import { ActionsObservable, StateObservable } from 'redux-observable';
import { RootState, RootAction } from 'MyTypes';
import {ajax} from "rxjs/ajax";

export function getProfile(action$: ActionsObservable<RootAction>, state$: StateObservable<RootState>): Observable<Profile> {
  const { jwt_token } = state$.value.auth.tokens;
  const options = {
    headers: {
      Authorization: `Bearer ${jwt_token}`,
    },
    url: 'api/v1/users/profile',
  };
  return ajax(options);
}
