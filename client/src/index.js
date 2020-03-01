import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
//Redux
import store from './store';
import {Provider} from 'react-redux';
import App from './App';
import ScrollToTop from './common/utils/ScrollToTop';

ReactDOM.render(
 <Provider store={store}>
  <Router>
   <ScrollToTop>
    <App store={store} />
   </ScrollToTop>
  </Router>
 </Provider>,

 document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
