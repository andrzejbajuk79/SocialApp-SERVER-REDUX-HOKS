import axios from 'axios';
import {setAlert} from './Alert.actions';
import {GET_PROFILE, PROFILE_ERROR} from './constants';

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
