import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import * as sessionActions from "../../store/session";

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
    sessionUser &&
    (<form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, index) => <li key={index}>{error}</li>)}
      </ul>
      <label>
        First Name
        <input
          type="text"
          value={firstName}
          onChange={(e) => setfirstName(e.target.value)}
          required
        />
      </label>
      <label>
        Last Name
        <input
          type="text"
          value={lastName}
          onChange={(e) => setlastName(e.target.value)}
          required
        />
      </label>
      <label>
        Email
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </label>
      <label>
        Password
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </label>
      <label>
        Confirm Password
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </label>
      <i className="fa-solid fa-images"></i> Upload Images
        <input
          type="file"
          name="file"
          onChange={(e) => setPicUrl(e.target.files[0])}
        />
      <button type="submit">Submit</button>
      <button onClick={handleCancel} type="button">Cancel</button>
    </form>)
  );
}

export default EditProfile;
