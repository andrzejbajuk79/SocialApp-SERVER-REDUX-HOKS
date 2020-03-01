import axios from 'axios';
import {setAlert} from './Alert.actions';
import {GET_PROFILE, PROFILE_ERROR, GET_ERRORS} from './constants';

const config = {
 headers: {
  'Content-Type': 'application/json',
 },
};
// Get currebt users PRofile

export const getCurrentProfile = () => dispatch => {
 axios
  .get('/api/profile/me')
  .then(
   res =>
    console.log(res) ||
    dispatch({
     type: GET_PROFILE, //
     payload: res.data,
    })
  )
  .catch(err => {
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText, //
     status: err.response.status,
    },
   });
  });
};

// Create Profile
export const createProfile = (
 profileData,
 history,
 edit = false
) => dispatch => {
 axios
  .post('/api/profile', profileData)
  .then(res => {
   dispatch({
    type: GET_PROFILE, //
    payload: res.data,
   });
   dispatch(setAlert(edit ? 'Profile updatet' : 'Profile created', 'success'));
   if (!edit) {
    history.push('/dashboard');
   }
  })
  .catch(err => {
   const errors = err.response.data.errors;
   if (errors) {
    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
   }
   //  dispatch({
   //   type: GET_ERRORS,
   //   payload: err.response.data,
   //  });
   dispatch({
    type: PROFILE_ERROR,
    payload: {
     msg: err.response.statusText, //
     status: err.response.status,
    },
   });
  });
};
