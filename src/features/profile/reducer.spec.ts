import {
  profileReducer as reducer,
  profileActions as actions,
  ProfileState,
} from './';
// import { LoginDto, Tokens } from './models';
//

const getInitialState = (initial?: Partial<ProfileState>) =>
  reducer(initial as ProfileState, {} as any);

describe('Profile stories', () => {
    describe('initial state', () => {
    it('should match a snapshot', () => {
      const initialState = getInitialState();
      expect(initialState).toMatchSnapshot();
    });
  });
})

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

  describe('profile', () => {
    it('should set isLoadingProfile to true', () => {
      const initialState = getInitialState({
        isLoadingProfile: false,
      });

      const state = reducer(initialState, actions.getProfileAsync.request());
      expect(state.isLoadingProfile).toBeTruthy();
    });

    it('should save response from request into reducer', () => {
      const initialState = getInitialState({
        isLoadingProfile: false,
        profile: {
          error: '',
          profile: {
            email: ''
          }
        }
      });

      const expectedEmail ='damian20lewandowski@gmail.com'
      const state = reducer(initialState, actions.getProfileAsync.success({email: expectedEmail}));

      expect(state.profile.profile.email).toBe(expectedEmail);
    })

    it('should save error from request into reducer', () => {
      const initialState = getInitialState({
        isLoadingProfile: false,
        profile: {
          error: '',
          profile: {
            email: ''
          }
        }
      });

      const errorMsg = 'Some error message'
      const state = reducer(initialState, actions.getProfileAsync.failure(errorMsg));

      expect(state.profile.error).toBe(errorMsg)
    })
  });


});
