import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './editprofile.css';

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState(sessionUser.email);
  const [firstName, setfirstName] = useState(sessionUser.firstName);
  const [lastName, setlastName] = useState(sessionUser.lastName);
  const [picUrl, setPicUrl] = useState(sessionUser.picUrl);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState([]);

  const handleCancel = () => {
    setErrors([]);
    history.push('/profile');
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      if (password === confirmPassword) {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', picUrl);
        console.log(formData, 'this is form dataaaa')
        const updatedUser = await dispatch(sessionActions.editUser(formData, sessionUser.id))

        if (updatedUser) {
          history.push('/profile');
        }
      }
      else {
        if (password !== confirmPassword) return setErrors(['Confirm Password field must be the same as the Password field']);
      }
    }
    catch (error) {
      const err = await error.json();
      return setErrors(err.errors);
    }
  };

  return (
    <div className="profile-edit-page">
      <div className="profile-form-div">
      {sessionUser &&
        (<form
          onSubmit={handleSubmit}
          className='profile-edit-form'
        >
          <h2 className="profile-edit-header h2-head">Edit Profile</h2>
          <label className="profile-edit-labels">First Name</label>
            <input
              className="profile-edit-input"
              type="text"
              value={firstName}
              onChange={(e) => setfirstName(e.target.value)}
              required
              />
          <label className="profile-edit-labels">Last Name</label>
            <input
             className="profile-edit-input"
              type="text"
              value={lastName}
              onChange={(e) => setlastName(e.target.value)}
              required
              />
          <label className="profile-edit-labels">Email</label>
            <input
             className="profile-edit-input"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              />
          <label className="profile-edit-labels">Password</label>
            <input
             className="profile-edit-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              />
          <label className="profile-edit-labels">Confirm Password</label>
            <input
             className="profile-edit-input"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              />
          <div className='signup-img-div'>
            <i className="fa-solid fa-images">Upload Photo</i>
            <p className='skatepark-form-p-signup'>* photo optional</p>
            <input
              className='image-input'
              type="file"
              name="file"
              onChange={(e) => setPicUrl(e.target.files[0])}
            />
          </div>
          <ul>
            {errors.map((error, index) => <li className="signup-errors" key={index}>{error}</li>)}
          </ul>
          <button className="profile-edit-submit-btn" type="submit">Submit</button>
          <button className="profile-edit-cancel-btn" onClick={handleCancel} type="button">Cancel</button>
        </form>)}
      </div>
    </div>
  );
}

export default EditProfile;
