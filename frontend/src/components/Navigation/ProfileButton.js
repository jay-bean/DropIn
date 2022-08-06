import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useHistory }from 'react-router-dom';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  return (
    <div className="profile-btn-container">
      <button className="prof-btn" onClick={openMenu}>
      <i className="fa-regular fa-circle-user"></i>
      </button>


      {showMenu && (
        <ul className="profile-dropdown">
          <Link to='/profile'><li className="prof-li top">Profile</li></Link>
          <Link to ='/profile/skateparks'><li className="prof-li">Skateparks</li></Link>
          <Link to='/profile/favorites'><li className="prof-li">Favorites</li></Link>
          <Link to='/profile/reviews'><li className="prof-li">Reviews</li></Link>
          <li className="prof-li" onClick={logout}>Log out</li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
