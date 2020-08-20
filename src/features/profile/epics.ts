import {
  catchError,
  filter,
  map,
  mergeMap,
} from 'rxjs/operators';
import { isActionOf} from 'typesafe-actions';
import {defer, of} from 'rxjs';

import { getProfileAsync } from './actions';
import { RootEpic } from 'MyTypes';

//
export const getProfileEpic: RootEpic = (action$, state$, { api, toast }) =>
  action$.pipe(
    filter(isActionOf(getProfileAsync.request)),
    mergeMap(action =>
      defer(() => {
        return api.profile.getProfile(action$, state$);
      }).pipe(
        map(res => getProfileAsync.success(res.response)),
        catchError((error, source) => {
          if (error.status === 401) {
            return api.errorHandler.handle401Error(action$, state$, source)
          }

          return of(getProfileAsync.failure(error));
        })
      )
    )
  );
