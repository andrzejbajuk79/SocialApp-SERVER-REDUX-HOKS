import {POST_ERROR, GET_POSTS, POST_LOADING, CLEAR_ERRORS} from './constants';
import axios from 'axios';

import {setAlert} from './Alert.actions';

//get posts

export const getPosts = () => dispatch => {
 dispatch(setPostLoading());
 axios
  .get('/api/posts')
  .then(res => dispatch({type: GET_POSTS, payload: res.data}))
  .catch(err =>
   dispatch({
    type: POST_ERROR,
    payload: {
     msg: err.response.statusText,
     status: err.response.status,
    },
   })
  );
};

// Set loading state
export const setPostLoading = () => {
 return {
  type: POST_LOADING,
 };
};

// Clear errors
export const clearErrors = () => {
 return {
  type: CLEAR_ERRORS,
 };
};
