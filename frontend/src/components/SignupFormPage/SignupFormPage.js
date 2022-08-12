import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, Link } from "react-router-dom";
import { signup } from "../../store/session";
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
      return dispatch(signup(formData))
        .catch(async (res) => {
          if (res.status === 503) setErrors(['Only .png, .jpg and .jpeg format allowed.']);
          const data = await res.json();
          if (data) {
            if (data.errors && data.errors.length > 0) setErrors(data.errors);
            else if (data.message && data.wrongFormat) setErrors([data.message]);
          };
        });
    }
    return setErrors(['Confirm Password field must be the same as the Password field']);
  };

  return (
    <div className="signup-page">
      <div className="signup-form-div">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2 className="signup-form-header h2-head">Create your free account</h2>
          <div className="first-label">
            <label className='join-label'>* First Name</label>
            <label className="signup-labels">*All fields are required</label>
          </div>
          <input
            className="signup-input"
            type="text"
            value={firstName}
            onChange={(e) => setfirstName(e.target.value)}
            required
            />
          <label className='join-label'>* Last Name</label>
          <input
            className="signup-input"
            type="text"
            value={lastName}
            onChange={(e) => setlastName(e.target.value)}
            required
            />
          <label className='join-label'>* Email</label>
          <input
            className="signup-input"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
          <label className='join-label'>* Password</label>
          <input
            className="signup-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            />
          <label className='join-label'>* Confirm Password</label>
          <input
            className="signup-input"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            />
          <label className='signup-img-div'>
            <input
              className='image-input'
              type="file"
              name="file"
              onChange={(e) => setPicUrl(e.target.files[0])}
            />
            <p className='skatepark-form-p-signup'>*Photo optional</p>
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
