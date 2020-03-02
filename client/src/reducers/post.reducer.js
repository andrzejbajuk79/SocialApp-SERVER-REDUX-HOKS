import {POST_ERROR, GET_POSTS, POST_LOADING} from '../actions/constants';
import {createReducer} from './reducersUtils';
const INITIAL_STATE = {
 posts: [],
 post: null,
 loading: true,
 error: {},
};

const getPosts = (state, payload) => {
 return {
  ...state, //
  posts: payload,
  loading: false,
 };
};
const getError = (state, payload) => {
 return {
  ...state, //
  error: payload,
  loading: false,
 };
};
const loadingPost = (state, payload) => {
 return {
  ...state, //
  loading: true,
 };
};

export default createReducer(INITIAL_STATE, {
 [GET_POSTS]: getPosts,
 [POST_ERROR]: getError,
 [POST_LOADING]: loadingPost,
});
