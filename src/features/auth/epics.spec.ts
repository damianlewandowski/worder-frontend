import { LoginDto, Tokens } from './models';
import { Action, getType } from 'typesafe-actions';
import { loginEpic$ } from './epics';
import { loginAsync } from './actions';
import { ActionsObservable } from 'redux-observable';
import store from 'store';

describe('auth', function () {
  it('should return some jwt tokens', async () => {
    const successResponse: Tokens = {
      jwt_token: 'somerandomjwttoken',
      refresh_token: 'somerandomrefreshjwttoken',
    };

    const api = { auth: { login: jest.fn() } };
    api.auth.login.mockReturnValue(Promise.resolve(successResponse));

    const action$ = ActionsObservable.of({
      type: getType(loginAsync.request),
      email: 'somemeail',
      password: 'somepassword1',
    } as Action & LoginDto);

    const epic$ = loginEpic$(action$, store, { api });

    const result = await epic$.toPromise();

    expect(result).toEqual({
      type: getType(loginAsync.success),
      payload: successResponse,
      meta: 0,
    });
  });

  it('should return error', async () => {
    const errorMessage = 'dindunuthin';
    const errorResponse = {
      response: {
        data: {
          msg: errorMessage,
        },
      },
    };

    const api = { auth: { login: jest.fn() } };
    const toast = { error: jest.fn() };
    api.auth.login.mockReturnValue(Promise.reject(errorResponse));

    const action$ = ActionsObservable.of({
      type: getType(loginAsync.request),
      email: 'somemeail',
      password: 'somepassword1',
    } as Action & LoginDto);

    const epic$ = loginEpic$(action$, store, { api, toast });

    const result = await epic$.toPromise();

    expect(result).toEqual({
      type: getType(loginAsync.failure),
      payload: { msg: errorMessage },
    });
  });
});
