import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Navigation.css';
import DemoUser from '../DemoUser/DemoUser';
import { getUsers } from '../../store/user';

function Navigation({ isLoaded }){
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const users = useSelector(state => state.users);
  let demoUser;
  if (users) {
    demoUser = Object.values(users)[0];
  }
  useEffect(() => {
    dispatch(getUsers())
  }, [dispatch])

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <div className='nav-prof'>
        <NavLink className='skatepark-nav'exact to="/skateparks/new"><button className='skatepark-nav-btn'>Add Skatepark</button></NavLink>
        <ProfileButton user={sessionUser} />
      </div>
    );
  } else {
    sessionLinks = (
      <div className='nav-prof-demo'>
        {demoUser && <DemoUser demoUser={demoUser}/>}
        <NavLink to="/signup"><button className='signup-nav-btn'>Sign Up</button></NavLink>
        <NavLink to="/login"><button className='login-nav-btn'>Log in</button></NavLink>
      </div>
    );
  }

  return (
    <>
      <ul className='nav-ul'>
        <li className='navbar-container'>
          {/* <img className='navbar-dropdown' onClick={handleNavDropDown} src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/18E64E17-F182-4BE4-BC76-D69B29BF9EA6_4_5005_c.jpeg'/> */}
          <div className='explore-about-div'>
            <NavLink id='explore' exact to="/skateparks">Explore</NavLink>
            <NavLink className='about-me' exact to="/about">About</NavLink>
          </div>
          <NavLink id='drop-in' exact to="/">Drop In</NavLink>
          {isLoaded && sessionLinks}
        </li>
      </ul>
    </>
  );
}

export default Navigation;
