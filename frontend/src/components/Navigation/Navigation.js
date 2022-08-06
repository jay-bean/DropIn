import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import DemoUser from '../DemoUser/DemoUser';

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-prof'>
        <NavLink className='skatepark-nav'exact to="/skateparks/new">+ Skatepark</NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='nav-prof-demo'>
        <DemoUser/>
        <NavLink to="/signup"><button className='signup-nav-btn'>Sign Up</button></NavLink>
        <NavLink to="/login"><button className='login-nav-btn'>Log in</button></NavLink>
      </div>
    );
  }

  return (
     <ul className='nav-ul'>
      <li className='navbar-container'>
        <div className='explore-about-div'>
          <NavLink id='explore' exact to="/skateparks">Explore</NavLink>
          <NavLink className='about-me' exact to="/about">About</NavLink>
        </div>
        <NavLink id='drop-in' exact to="/">Drop In</NavLink>
        {isLoaded && sessionLinks}
      </li>
    </ul>
  );
}

export default Navigation;
