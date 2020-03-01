import {createReducer} from './reducersUtils';
import {PROFILE_ERROR, GET_PROFILE, CLEAR_PROFILE} from '../actions/constants';
const INITIAL_STATE = {
 profile: null,
 profiles: [], //
 repos: [],
 loading: true,
 error: {},
};

const getProfile = (state, payload) => {
 return {
  ...state, //
  profile: payload,
  loading: false,
 };
};
const profileError = (state, payload) => {
 return {
  ...state, //
  error: payload,
  loading: false,
 };
};
const clearProfile = (state, payload) => {
 return {
  ...state, //
  profile: null,
  repos: [],
  loading: false,
 };
};

export default createReducer(INITIAL_STATE, {
 [GET_PROFILE]: getProfile,
 [PROFILE_ERROR]: profileError,
 [CLEAR_PROFILE]: clearProfile,
});
