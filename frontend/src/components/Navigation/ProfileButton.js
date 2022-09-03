import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { Link, useHistory }from 'react-router-dom';

function ProfileButton() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [showMenu, setShowMenu] = useState(false);

  const handleShowMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    history.push('/');
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  return (
    <div className="prof-btn-container">
      <Link className="profile" onMouseOver={handleShowMenu} onClick={handleShowMenu}>Profile <img className={ showMenu ? 'sort-arrow-prof sort-arrow-prof-active' : 'sort-arrow-prof'} src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/C9D833C8-7EC7-4D53-9CF0-DDEB416E4A81_4_5005_c.jpeg'/></Link>
      <i onMouseOver={handleShowMenu} onClick={handleShowMenu} className="fa-regular fa-circle-user"></i>
      {showMenu && (
        <ul className="profile-dropdown">
          <Link to='/profile'><li className="prof-li top">Profile</li></Link>
          <Link to ='/profile/skateparks'><li className="prof-li">Skateparks</li></Link>
          <Link to='/profile/favorites'><li className="prof-li">Favorites</li></Link>
          <Link to='/profile/reviews'><li className="prof-li">Reviews</li></Link>
          <div className="prof-li bottom" onClick={logout}>Log out</div>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
