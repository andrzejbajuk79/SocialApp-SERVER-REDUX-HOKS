import axios from 'axios';
import {setAlert} from '../actions/Alert.actions';
import {
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 USER_LOADED,
 AUTH_ERROR,
 LOGIN_SUCCESS,
 LOGIN_FAIL,
 LOGOUT,
 CLEAR_PROFILE,
} from './constants';
import setAuthToken from '../common/utils/setAuthToken';

const config = {
 headers: {
  'Content-Type': 'application/json',
 },
};

// Load users
export const loadUser = () => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 axios
  .get('/api/auth')
  .then(
   res =>
    console.log(res) ||
    dispatch({
     type: USER_LOADED, //
     payload: res.data,
    })
  )
  .catch(err => {
   dispatch({type: AUTH_ERROR});
  });
};

// Register User
export const register = ({name, email, password}) => async dispatch => {
 const body = JSON.stringify({name, email, password});

 axios
  .post('/api/users', body, config)
  .then(res =>
   dispatch({
    type: REGISTER_SUCCESS,
    payload: res.data,
   })
  )
  .then(() => dispatch(loadUser()))
  .catch(err => {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
   }
   dispatch({
    type: REGISTER_FAIL,
   });
  });
};

// Login User
export const login = (email, password) => async dispatch => {
 const body = JSON.stringify({email, password});
 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };
 axios
  .post('/api/auth', body, config)
  .then(res =>
   dispatch({
    type: LOGIN_SUCCESS,
    payload: res.data,
   })
  )
  .then(() => dispatch(loadUser()))
  .catch(err => {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
   }
   dispatch({
    type: LOGIN_FAIL,
   });
  });
};

// Logout  && Clear Profile
export const logout = () => dispatch => {
 dispatch({
  type: CLEAR_PROFILE,
 });
 dispatch({
  type: LOGOUT,
 });
};
