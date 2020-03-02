import {
 POST_ERROR,
 GET_POSTS,
 POST_LOADING,
 UPDATE_LIKES,
 CLEAR_ERRORS,
 DELETE_POST,
 ADD_POST,
} from './constants';
import axios from 'axios';

import {setAlert} from './Alert.actions';
const config = {
 headers: {
  'Content-Type': 'application/json',
 },
};
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

//Add Like
export const addLike = id => dispatch => {
 axios
  .post(`/api/posts/like/${id}`)
  .then(res =>
   dispatch({
    type: UPDATE_LIKES,
    payload: {id, likes: res.data},
   })
  )
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

//RemoveLike
export const removeLike = id => dispatch => {
 //  dispatch(setPostLoading());
 axios
  .put(`/api/posts/unlike/${id}`)
  .then(res => {
   dispatch({
    type: UPDATE_LIKES,
    payload: {id, likes: res.data},
   });
  })
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
//delete post
export const deletePost = id => dispatch => {
 dispatch(setPostLoading());
 axios
  .delete(`/api/posts/${id}`)
  .then(res => {
   dispatch({
    type: DELETE_POST,
    payload: id,
   });
   dispatch(setAlert('Post deleted', 'success'));
  })
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

//add post
export const addPost = formData => dispatch => {
 dispatch(setPostLoading());
 axios
  .post(`/api/posts/`, formData, config)
  .then(res => {
   dispatch({
    type: ADD_POST,
    payload: res.data,
   });
   dispatch(setAlert('Post added', 'success'));
  })
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
