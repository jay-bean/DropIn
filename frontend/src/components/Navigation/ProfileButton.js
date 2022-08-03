import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
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
  };

  return (
    <div className="profile-btn-container">
      <button className="prof-btn" onClick={openMenu}>
      <i class="fa-regular fa-circle-user"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li className="prof-li">{user.firstName} {user.lastName}</li>
          <li className="prof-li">{user.email}</li>
          <li className="prof-li">
            <button className="prof-logout" onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
