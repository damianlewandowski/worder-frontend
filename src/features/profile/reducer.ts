import { combineReducers } from 'redux';
import { ActionType, createReducer } from 'typesafe-actions';
import { getProfileAsync } from './actions';
import { Profile } from 'MyModels';
import * as actions from './actions';

export type ProfileState = Readonly<{
  isLoadingProfile: boolean;
  profile: {
    profile: Profile;
    error: string;
  };
}>;
export type ProfileAction = ActionType<typeof actions>;

const initialState: ProfileState = {
  isLoadingProfile: false,
  profile: { profile: { email: ''}, error: ''  },
};

const reducer = combineReducers<ProfileState, ProfileAction>({
  isLoadingProfile: createReducer(initialState.isLoadingProfile)
    .handleAction([getProfileAsync.request], (state, action) => true)
    .handleAction(
      [getProfileAsync.success, getProfileAsync.failure],
      (state, action) => false
    ),
  profile: createReducer(initialState.profile as Profile)
    .handleAction([getProfileAsync.success], (state, action) => {
      return {
        ...state,
        profile: action.payload
      }
    })
    .handleAction(getProfileAsync.failure, (state, action) => ({
      ...state,
      error: action.payload,
    })),
});

export default reducer;
