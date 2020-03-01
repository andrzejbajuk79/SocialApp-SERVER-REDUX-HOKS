import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
//Redux
import {loadUser} from './actions/Auth.actions';
import setAuthToken from './common/utils/setAuthToken';
import store from './store';
import {Provider} from 'react-redux';
import App from './App';

if (localStorage.token) {
 setAuthToken(localStorage.token);
}
store.dispatch(loadUser());
ReactDOM.render(
 <Provider store={store}>
  <Router>
   {/* <ScrollToTop> */}
   <App />
   {/* </ScrollToTop> */}
  </Router>
 </Provider>,

 document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
