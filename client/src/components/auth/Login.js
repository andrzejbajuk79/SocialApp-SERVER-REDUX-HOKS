import React, {Fragment, useState} from 'react';
import {Link} from 'react-router-dom';

const Login = () => {
 const [formData, setFormdata] = useState({
  email: '',
  password: '',
 });
 const {email, password} = formData;
 const handleInput = e =>
  setFormdata({...formData, [e.target.name]: e.target.value});
 const onSubmit = async e => {
  e.preventDefault();
  console.log('Success');
 };
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

export default Login;
