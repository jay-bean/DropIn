import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginForm from '../LoginFormPage/LoginFormPage';
import './Navigation.css';
import DemoUser from '../DemoUser/DemoUser';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <DemoUser/>
        <NavLink to="/login">Log in</NavLink>
        <NavLink to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/skateparks">Explore</NavLink>
        <NavLink exact to="/">Home</NavLink>
        <NavLink exact to="/skateparks/new">Add Skatepark</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
