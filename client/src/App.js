import React, {Fragment} from 'react';
import {Route, Switch} from 'react-router-dom';
import './styles/styles.scss';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Alert from './components/layout/Alert';

const App = () => (
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
);

export default App;
