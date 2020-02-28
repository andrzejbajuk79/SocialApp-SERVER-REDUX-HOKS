import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {login} from '../../actions/Auth.actions';

import {Link, Redirect} from 'react-router-dom';

const Login = ({login, isAuthenticated}) => {
 const [formData, setFormdata] = useState({
  email: '',
  password: '',
 });
 const {email, password} = formData;
 const handleInput = e =>
  setFormdata({...formData, [e.target.name]: e.target.value});
 const onSubmit = async e => {
  e.preventDefault();
  login(email, password);
 };

 //Redirect if logged in
 if (isAuthenticated) {
  return <Redirect to='/dashboard' />;
 }
 return (
  <Fragment>
   <h1 className='large text-primary'>Sign In</h1>
   <p className='lead'>
    <i className='fas fa-user'></i>Sign Into Your Account
   </p>
   <form className='form' onSubmit={e => onSubmit(e)}>
    <div className='form-group'>
     <input
      onChange={e => handleInput(e)}
      value={email}
      type='email'
      placeholder='Email Address'
      name='email'
     />
    </div>
    <div className='form-group'>
     <input
      onChange={e => handleInput(e)}
      value={password}
      type='password'
      placeholder='Password'
      name='password'
      minLength='6'
     />
    </div>

    <input type='submit' className='btn btn-primary' value='Login' />
   </form>
   <p className='my-1'>
    Don`t have an account? <Link to='/register'>Sign Up</Link>
   </p>
  </Fragment>
 );
};
Login.propTypes = {
 login: PropTypes.func.isRequired, //ptfr
 isAuthenticated: PropTypes.bool, //ptb
};

const mapStateToProps = state => ({
 isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {login})(Login);
