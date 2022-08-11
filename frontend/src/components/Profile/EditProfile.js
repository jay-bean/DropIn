import React, { useState } from "react";
import { useHistory, Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";
import './editprofile.css';

function EditProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState(sessionUser ? sessionUser.email : '');
  const [firstName, setfirstName] = useState(sessionUser ? sessionUser.firstName : '');
  const [lastName, setlastName] = useState(sessionUser ? sessionUser.lastName : '');
  const [picUrl, setPicUrl] = useState(sessionUser ? sessionUser.picUrl : '');
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
      if (sessionUser.email === 'seeyou@laterboy.io') return setErrors(['At this time you cannot edit the demo user\'s profile.']);
      if (password === confirmPassword) {
        const formData = new FormData();
        formData.append('firstName', firstName);
        formData.append('lastName', lastName);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('image', picUrl);
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
      if (err.message) return setErrors([err.message]);
      else if (err.errors) return setErrors(err.errors);
      console.log(error, 'this is errorrrrr');
      console.log(err, 'this is err')
    }
  };

  return (
    sessionUser ?
      (<div className="profile-form-div">
        <div className='first-buffer'>
            <div className='first-buffer-flex'>
              <p>Member</p><p className='carrot'>{'>'}</p><p>{sessionUser.firstName} {sessionUser.lastName}</p>
            </div>
          </div>
            <div className='second-buffer'>
              <div className='second-buffer-flex'>
                <Link className={'profile-links active-prof-links'} to='/profile'>Profile</Link>
                <Link className={'profile-links'} to='/profile/skateparks'>Skateparks</Link>
                <Link className={'profile-links'} to='/profile/favorites'>Favorites</Link>
                <Link className={'profile-links'} to='/profile/reviews'>Reviews</Link>
              </div>
            </div>
            <div className='profile-page-content'>
          <div className='profile-box'>
            <div className='profile-flex-container'>
              <div className='profile-column-one'>
                <div className='profile-container-header'>
                  <div className='profile-container-header-flex'>
                    <h2 className='prof-headers'>Edit Profile</h2>
                  </div>
                </div>
                <div className='all-container-profile'>
                  <form
                    onSubmit={handleSubmit}
                    className='profile-edit-form'
                  >
                    <h2 className="profile-edit-header h2-head">Edit Profile</h2>
                    <label className="profile-edit-labels">* First Name</label>
                      <input
                        className="profile-edit-input"
                        type="text"
                        value={firstName}
                        onChange={(e) => setfirstName(e.target.value)}
                        required
                        />
                    <label className="profile-edit-labels">* Last Name</label>
                      <input
                      className="profile-edit-input"
                        type="text"
                        value={lastName}
                        onChange={(e) => setlastName(e.target.value)}
                        required
                        />
                    <label className="profile-edit-labels">* Email</label>
                      <input
                      className="profile-edit-input"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        />
                    <label className="profile-edit-labels">* Password</label>
                      <input
                      className="profile-edit-input"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        />
                    <label className="profile-edit-labels">* Confirm Password</label>
                      <input
                      className="profile-edit-input"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        />
                    <label className='signup-img-div'>
                      <i className="fa-solid fa-images">Upload Photo</i>
                      <p className='skatepark-form-p-signup'>* photo optional</p>
                      <input
                        className='image-input'
                        type="file"
                        name="file"
                        onChange={(e) => setPicUrl(e.target.files[0])}
                      />
                    </label>
                    <ul>
                      {errors.map((error, index) => <li className="signup-errors" key={index}>{error}</li>)}
                    </ul>
                    <div className="profile-edit-btns">
                      <button className="profile-edit-submit-btn" type="submit">Submit</button>
                      <button className="profile-edit-cancel-btn" onClick={handleCancel} type="button">Cancel</button>
                    </div>
                  </form>
                </div>



              </div>

              <div className='profile-column-two'>
                <div className='contribute'>
                  <h3>Contribute</h3>
                    <Link className='add-park-contribute-flex' to='/skateparks/new'><p className='plus-sign'>+</p><p className='profile-add-contribute'>Add a skatepark</p></Link>
                </div>
                <div className='add-descriptor-div'>
                  <p className='add-descriptor'>Welcome to Drop In! Thanks for being apart of the community {sessionUser.firstName}. Our goal is to help you find your next skatepark with ease. Now go out there and drop in!</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>) :  <Redirect to="/" />

  );
}

export default EditProfile;
