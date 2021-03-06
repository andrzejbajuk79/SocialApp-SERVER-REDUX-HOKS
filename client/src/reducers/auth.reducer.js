import {createReducer} from './reducersUtils';
import {
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGOUT,
 ACCOUNT_DELETED,
} from '../actions/constants';

const INITIAL_STATE = {
 token: localStorage.getItem('token'),
 isAuthenticated: null,
 loading: true,
 user: null,
};

//Register User
const registerSuccess = (state = INITIAL_STATE, payload) => {
 localStorage.setItem('token', payload.token);
 console.log(state);

 return {
  ...state,
  ...payload,
  isAuthenticated: true,
  loading: false,
 };
};

const registerFail = (state, payload) => {
 localStorage.removeItem('token');
 return {
  ...state,
  token: null,
  isAuthenticated: false,
  loading: false,
 };
};

const loadingUser = (state, payload) => {
 return {
  ...state, //
  isAuthenticated: true,
  loading: false,
  user: payload,
 };
};

export default createReducer(INITIAL_STATE, {
 [REGISTER_SUCCESS]: registerSuccess,
 [REGISTER_FAIL]: registerFail,
 [LOGIN_FAIL]: registerFail,
 [LOGOUT]: registerFail,
 [AUTH_ERROR]: registerFail,
 [USER_LOADED]: loadingUser,
 [LOGIN_SUCCESS]: registerSuccess,
 [ACCOUNT_DELETED]: registerFail,
});
