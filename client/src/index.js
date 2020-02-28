import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import App from './App';

import ScrollToTop from './common/utils/ScrollToTop';

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
