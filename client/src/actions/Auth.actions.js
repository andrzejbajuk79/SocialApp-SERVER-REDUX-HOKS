import axios from 'axios';
import {setAlert} from '../actions/Alert.actions';
import {
 REGISTER_FAIL,
 REGISTER_SUCCESS,
 USER_LOADED,
 AUTH_ERROR,
} from './constants';
import setAuthToken from '../common/utils/setAuthToken';

// Load users
export const loadUser = () => async dispatch => {
 if (localStorage.token) {
  setAuthToken(localStorage.token);
 }
 try {
  const res = await axios.get('/api/auth');
  dispatch({
   type: USER_LOADED, //
   payload: res.data,
  });
 } catch (err) {
  dispatch({type: AUTH_ERROR});
 }
};

//Register User
export const register = ({name, email, password}) => async dispatch => {
 const config = {
  headers: {
   'Content-Type': 'application/json',
  },
 };
 const body = JSON.stringify({name, email, password});

 const user = {name, email, password};
 try {
  // const res = RegisterUser(user);
  const res = await axios.post('/api/users', body, config);
  console.log(res.data);

  dispatch({
   type: REGISTER_SUCCESS,
   payload: res.data,
  });
 } catch (err) {
  const errors = err.response.data.errors;
  console.log(errors);
  if (errors) {
   errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
  }
  dispatch({
   type: REGISTER_FAIL,
  });
 }
};
