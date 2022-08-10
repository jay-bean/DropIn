import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";
import './SignupForm.css';

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [picUrl, setPicUrl] = useState({});
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  console.log(firstName, lastName, email, password)
  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      const formData = new FormData();
      formData.append('firstName', firstName);
      formData.append('lastName', lastName);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('image', picUrl);
      console.log(formData, 'formdata');
      return dispatch(sessionActions.signup(formData))
        .catch(async (res) => {
          const data = await res.json();
          console.log(data, 'data')
          if (data && data.errors) setErrors(data.errors);
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-page">
      <div className="signup-form-div">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-form-header h2-head">Create your free account</h2>
          <label className="signup-labels">*All fields are required</label>
          <input
            className="signup-input"
            placeholder="First Name"
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
            />
          <input
            className="signup-input"
            placeholder="Last Name"
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
            />
          <input
            className="signup-input"
            placeholder="Email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          <input
            className="signup-input"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          <input
            className="signup-input"
            placeholder="Confirm Password"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
          <label className='signup-img-div'>
            <i className="fa-solid fa-images">Upload Photo</i>
            <p className='skatepark-form-p-signup'>*Optional</p>
            <input
              className='image-input'
              type="file"
              name="file"
              onChange={(e) => setPicUrl(e.target.files[0])}
            />
          </label>
          <ul>
            {errors.map((error, idx) => <li className='signup-errors' key={idx}>{error}</li>)}
          </ul>
          <button className="signup-btn" type="submit">Sign Up</button>
          <div className="signup-login-div">
            <p>Already have an account?</p>
            <Link className='signup-login-link' to='/login'>Log in</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignupFormPage;
