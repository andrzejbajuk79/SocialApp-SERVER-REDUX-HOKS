import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link, Redirect} from 'react-router-dom';

import PropTypes from 'prop-types'; //impt

import {setAlert} from '../../actions/Alert.actions';
import {register} from '../../actions/Auth.actions';

const Register = ({setAlert, register, isAuthenticated}) => {
 const [formData, setFormdata] = useState({
  name: '',
  email: '',
  password: '',
  password2: '',
 });
 const {name, email, password, password2} = formData;
 const handleInput = e =>
  setFormdata({...formData, [e.target.name]: e.target.value});

 const onSubmit = e => {
  e.preventDefault();
  if (password !== password2) {
   // props.dispatch(setAlert('Password not match', 'danger'));
   setAlert('Password not match', 'danger', 5000);
  } else {
   // RegisterUser(newUser);
   register({name, email, password});
  }
 };
 //Redirect if logged in
 if (isAuthenticated) {
  return <Redirect to='/dashboard' />;
 }
 return (
  <Fragment>
   <h1 className='large text-primary'>Sign Up</h1>
   <p className='lead'>
    <i className='fas fa-user'></i> Create Your Account
   </p>
   <form className='form' onSubmit={e => onSubmit(e)}>
    <div className='form-group'>
     <input
      onChange={e => handleInput(e)}
      value={name}
      type='text'
      placeholder='Name'
      name='name'
     />
    </div>
    <div className='form-group'>
     <input
      onChange={e => handleInput(e)}
      value={email}
      type='email'
      placeholder='Email Address'
      name='email'
     />
     <small className='form-text'>
      This site uses Gravatar so if you want a profile image, use a Gravatar
      email
     </small>
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
    <div className='form-group'>
     <input
      onChange={e => handleInput(e)}
      value={password2}
      type='password'
      placeholder='Confirm Password'
      name='password2'
      minLength='6'
     />
    </div>
    <input type='submit' className='btn btn-primary' value='Register' />
   </form>
   <p className='my-1'>
    Already have an account? <Link to='/login'>Sign In</Link>
   </p>
  </Fragment>
 );
};
Register.propTypes = {
 setAlert: PropTypes.func.isRequired, //ptfr
 register: PropTypes.func.isRequired,
 isAuthenticated: PropTypes.bool, //ptb
};

const mapStateToProps = state => ({
 isAuthenticated: state.auth.isAuthenticated,
});
export default connect(mapStateToProps, {setAlert, register})(Register);
