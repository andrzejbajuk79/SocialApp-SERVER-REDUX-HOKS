import {createReducer} from '../common/utils/reducersUtils';
import {SET_ALERT, REMOVE_ALERT} from '../components/actions/constants';
const INITIAL_STATE = [];

// export default function(state = INITIAL_STATE, action) {
//  const {type, payload} = action;
//  switch (type) {
//   case SET_ALERT:
//    return [...state, payload];
//   case REMOVE_ALERT:
//    return state.filter(alert => alert.id !== payload);

//   default:
//    return [];
//  }
// }

const setAlert = (state, payload) => {
 return [...state, payload];
};

const removeAlert = (state, payload) => {
 return state.filter(alert => alert.id !== payload);
};

export default createReducer(INITIAL_STATE, {
 [SET_ALERT]: setAlert,
 [REMOVE_ALERT]: removeAlert,
});
