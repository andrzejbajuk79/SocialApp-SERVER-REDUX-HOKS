import {
 POST_ERROR,
 GET_POSTS,
 POST_LOADING,
 UPDATE_LIKES,
 DELETE_POST,
 ADD_POST,
} from '../actions/constants';
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

const updateLikes = (state, payload) => {
 return {
  ...state,
  posts: state.posts.map(post =>
   post._id === payload.id ? {...post, likes: payload.likes} : post
  ),
  loading: false,
 };
};
const deletePost = (state, payload) => {
 return {
  ...state,
  posts: state.posts.filter(post => post._id !== payload),
  loading: false,
 };
};
const addPost = (state, payload) => {
 return {
  ...state,
  posts: [...state.posts, payload],
  loading: false,
 };
};

export default createReducer(INITIAL_STATE, {
 [GET_POSTS]: getPosts,
 [POST_ERROR]: getError,
 [POST_LOADING]: loadingPost,
 [UPDATE_LIKES]: updateLikes,
 [DELETE_POST]: deletePost,
 [ADD_POST]: addPost,
});
