import React, {Fragment, useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import './styles/styles.scss';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

import {loadUser} from './actions/Auth.actions';
import setAuthToken from './common/utils/setAuthToken';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile1';
import PrivateRoute from './components/routing/PrivateRoute';
import EditProfile from './components/profile-forms/EditProfile';

if (localStorage.token) {
 setAuthToken(localStorage.token);
}
const App = ({store}) => {
 useEffect(() => {
  store.dispatch(loadUser());
 }, []);
 return (
  <Fragment>
   <Navbar />
   <Route exact path='/' component={Landing} />
   <section className='container'>
    <Alert />
    <Switch>
     <PrivateRoute exact path='/dashboard' component={Dashboard} />
     <PrivateRoute exact path='/create-profile' component={CreateProfile} />
     <PrivateRoute exact path='/edit-profile' component={EditProfile} />
     <Route exact path='/register' component={Register} />
     <Route exact path='/login' component={Login} />
    </Switch>
   </section>
  </Fragment>
 );
};

export default App;
