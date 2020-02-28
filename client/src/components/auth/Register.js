import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {RegisterUser} from '../../service/service';
import PropTypes from 'prop-types'; //impt

import {setAlert} from '../actions/Alert';

const Register = ({setAlert}) => {
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
   const newUser = {name, email, password};
   RegisterUser(newUser);
  }
 };
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
      required
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
};
export default connect(null, {setAlert})(Register);
