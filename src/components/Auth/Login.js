import React, { useState } from 'react';
import useFormValidation from './useFormValidation';
import validateLogin from './validateLogin';
import firebase from '../../firebase';
import { Link } from 'react-router-dom';

const INITIAL_STATE = {
  name: '',
  email: '',
  password: ''
};

function Login(props) {

  const [login, setLogin] = useState(true);
  const [firebaseErr, setFirebaseErr ] = useState(null);

  const authenticateUser = async () => {
    const { name, email, password } = values;
    try {
    login
      ? await firebase.login(email, password)
      : await firebase.register(name, email, password);
      props.history.push('/'); 
    } catch (err) {
      console.log('Authentication error ', err);
      setFirebaseErr(err.message);
    }
  };

  const {
    values,
    errors,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit
  } = useFormValidation(INITIAL_STATE, validateLogin, authenticateUser);

  return (
    <div>
      <h4 className='teal-text lighten-2'> {login ? 'Login' : 'Create Account'} </h4>
      <form onSubmit={handleSubmit}>
        {!login && (
          <div className='input-field'>
            <input
              type='text'
              id='name'
              value={values.name}
              autoComplete='off'
              className='validate'
              name='name'
              onChange={handleChange}
            />
            <label htmlFor='name'>Name</label>
          </div>
        )}
        <div className='input-field'>
          <input
            type='text'
            id='email'
            value={values.email}
            autoComplete='off'
            className={(errors.email && 'invalid') || 'validate'}
            name='email'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor='email'>Email</label>
          <span className='red-text'>{errors.email}</span>
        </div>
        <div className='input-field'>
          <input
            type='password'
            id='password'
            value={values.password}
            autoComplete='off'
            className={(errors.password && 'invalid') || 'validate'}
            name='password'
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <label htmlFor='password'>Password</label>
          <span className='red-text'>{errors.password}</span>
        </div>
        <span className='red-text'> {firebaseErr} </span>
        <div className='input-field'>
          <button
            className={isSubmitting ? 'btn grey waves-effect waves-light' : 'btn orange waves-effect waves-light'}
            disabled={isSubmitting}
          >
            Submit
          </button>
        </div>
        <div>
          <button
            type='button'
            className='btn teal lighten-2 waves-effect waves-light'
            onClick={() => setLogin(prevLogin => !prevLogin)}
          >
            {login ? 'need account' : 'have account'}
          </button>
        </div>
      </form>
      <div className='section'> 
        <Link to='/forgot'> Forgot password?</Link>
      </div>
    </div>
  );
}

export default Login;
