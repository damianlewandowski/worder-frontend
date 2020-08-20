import {
  authReducer as reducer,
  authActions as actions,
  AuthState,
} from './';
import { LoginDto, Tokens } from './models';

/**
 * FIXTURES
 */
const getInitialState = (initial?: Partial<AuthState>) =>
  reducer(initial as AuthState, {} as any);

/**
 * STORIES
 */
describe('Auth Stories', () => {
  describe('initial state', () => {
    it('should match a snapshot', () => {
      const initialState = getInitialState();
      expect(initialState).toMatchSnapshot();
    });
  });

  describe('login', () => {
    it('should save jwt_token and refreshToken into auth.tokens', () => {
      const initialState = getInitialState({
        isLoadingAuth: false,
        tokens: {
          jwt_token: '',
          refresh_token: ''
        }
      });

      expect(initialState.tokens.jwt_token).toHaveLength(0);
      expect(initialState.tokens.refresh_token).toHaveLength(0);

      const loginDto: LoginDto = {
        email: 'someemail@gmail.com',
        password: 'dupa123c'
      }
      const state = reducer(initialState, actions.loginAsync.request(loginDto));
      expect(state.isLoadingAuth).toBeTruthy();

      const tokens: Tokens = {
        refresh_token: 'somelongrefreshjwtotkne',
        jwt_token: 'somelongjwttoken'
      }
      const state2 = reducer(state, actions.loginAsync.success(tokens))
      expect(state2.tokens.jwt_token.length).toEqual(tokens.jwt_token.length)
      expect(state2.tokens.refresh_token.length).toEqual(tokens.refresh_token.length)
    });
  });

  // describe('toggling completion state', () => {
  //   it('should mark active todo as complete', () => {
  //     const activeTodo = { id: '1', completed: false, title: 'active todo' };
  //     const initialState = getInitialState({ todos: [activeTodo] });
  //     expect(initialState.todos[0].completed).toBeFalsy();
  //     const state1 = reducer(initialState, actions.toggle(activeTodo.id));
  //     expect(state1.todos[0].completed).toBeTruthy();
  //   });
  // });
});
