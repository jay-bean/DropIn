import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';

import * as sessionActions from '../../store/session';
import './LoginForm.css';

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const [credential, setCredential] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState([]);

  if (sessionUser) return (
    <Redirect to="/" />
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password }))
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  }

  return (
    <div className='login-page'>
      <div className='login-form-div'>
        <form className='login-form' onSubmit={handleSubmit}>
          <h2 className="signup-form-header h2-head">Log in and let's skate</h2>
            <label className='join-label'>* Email</label>
            <input
              className='signup-input'
              type="text"
              value={credential}
              onChange={(e) => setCredential(e.target.value)}
              required
              />
            <label className='join-label'>* Password</label>
            <input
              className='signup-input'
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          {errors.length ? (
            <ul className='login-form-errors'>
              {errors.map((error, idx) => <li className='signup-errors' key={idx}>{error}</li>)}
            </ul>
          ) : null}
          <button className="signup-btn" type="submit">Log In</button>
          <div className="signup-login-div">
            <p>Don't have an account?</p>
            <Link className='signup-login-link' to='/signup'>Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
