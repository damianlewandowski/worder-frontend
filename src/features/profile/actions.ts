import { createAsyncAction } from 'typesafe-actions';
import { Profile } from "MyModels";

export const getProfileAsync = createAsyncAction(
  'GET_PROFILE_REQUEST',
  'GET_PROFILE_SUCCESS',
  'GET_PROFILE_FAILURE'
)<undefined, Profile, string>();
