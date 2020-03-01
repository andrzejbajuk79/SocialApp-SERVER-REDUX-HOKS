import {combineReducers} from 'redux';
import alert from './alert.reducer';
import authReducer from './auth.reducer';
import profileReducer from './profile.reducer';
import errorReducer from './errorReducer';
const rootReducer = combineReducers({
 alert, //
 auth: authReducer,
 errors: errorReducer,
 profile: profileReducer,
});
export default rootReducer;
