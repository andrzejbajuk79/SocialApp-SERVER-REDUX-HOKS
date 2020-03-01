import {createReducer} from './reducersUtils';
import {
 PROFILE_ERROR,
 GET_PROFILE,
 CLEAR_PROFILE,
 UPDATE_PROFILE,
 PROFILE_LOADING,
 CLEAR_CURRENT_PROFILE,
 GET_PROFILES,
 GET_REPOS,
} from '../actions/constants';
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

const getProfiles = (state, payload) => {
 return {
  ...state, //
  profiles: payload,
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
const loadingProfile = state => {
 return {
  ...state,
  loading: true,
 };
};
const clearCurrentProfile = state => {
 return {
  ...state,
  profile: null,
 };
};

const getRepos = (state, payload) => {
 return {...state, repos: payload, loading: false};
};

export default createReducer(INITIAL_STATE, {
 [GET_PROFILE]: getProfile,
 [GET_PROFILES]: getProfiles,
 [PROFILE_ERROR]: profileError,
 [CLEAR_PROFILE]: clearProfile,
 [UPDATE_PROFILE]: getProfile,
 [PROFILE_LOADING]: loadingProfile,
 [CLEAR_CURRENT_PROFILE]: clearCurrentProfile,
 [GET_REPOS]: getRepos,
});
