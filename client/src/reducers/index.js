import {combineReducers} from 'redux';
import alert from './alert.reducer';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';
import errorReducer from './error.reducer';
import postReducer from './post.reducer';
const rootReducer = combineReducers({
 alert, //
 auth: authReducer,
 post: postReducer,
 errors: errorReducer,
 profile: profileReducer,
});
export default rootReducer;
