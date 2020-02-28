import {createReducer} from '../common/utils/reducersUtils';
import {
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGOUT,
} from '../actions/constants';

const INITIAL_STATE = {
 token: localStorage.getItem('token'),
 isAuthenticated: null,
 loading: true,
 user: null,
};

// export default function(state = INITIAL_STATE, action) {
//  const {type, payload} = action;
//  switch (type) {
//   case REGISTER_SUCCESS:
//    localStorage.setItem('token', payload.token);
//    return {
//     ...state,
//     ...payload,
//     isAuthenticated: true,
//     loading: false,
//    };
//   case REGISTER_FAIL:
//    localStorage.removeItem('token');
//    return {
//     ...state,
//     token: null,
//     isAuthenticated: false,
//     loading: false,
//    };
//   default:
//    return state;
//  }
// }

//Load users

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
});
