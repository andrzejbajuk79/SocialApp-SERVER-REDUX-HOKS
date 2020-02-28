import React, {Fragment, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './styles/styles.scss';
import {BrowserRouter as Router} from 'react-router-dom';
//Redux
import {Provider} from 'react-redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';
import ScrollToTop from './common/utils/ScrollToTop';
import {loadUser} from './actions/Auth.actions';
import setAuthToken from './common/utils/setAuthToken';

if (localStorage.token) {
 setAuthToken(localStorage.token);
}
const App = () => {
 useEffect(() => {
  store.dispatch(loadUser());
 }, []);
 return (
  <Provider store={store}>
   <Router>
    <ScrollToTop>
     <Fragment>
      <Navbar />
      <Route exact path='/' component={Landing} />
      <section className='container'>
       <Alert />
       <Switch>
        <Route exact path='/register' component={Register} />
        <Route exact path='/login' component={Login} />
       </Switch>
      </section>
     </Fragment>
    </ScrollToTop>
   </Router>
  </Provider>
 );
};

export default App;
