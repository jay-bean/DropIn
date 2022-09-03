import React, { useEffect, useState } from 'react';
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
  const [sideNav, setSideNav] = useState(false);

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
          <p className='sidenav-p'>Thanks for visiting.</p>
          <p className='sidenav-p'>Now go find a park and skate!</p>
          <NavLink className='signup-nav-link' to="/signup"><button className='signup-nav-btn'>Sign Up</button></NavLink>
          <NavLink className='login-nav-link' to="/login"><button className='login-nav-btn'>Log in</button></NavLink>
        </div>
    );
  }

  const toggleSideNav = () => {
    sideNav ? setSideNav(false) : setSideNav(true);
  }

  return (
    <>
      <ul className='nav-ul first-nav'>
        <li className='navbar-container'>
          <div className='explore-about-div'>
            <NavLink id='explore' exact to="/skateparks">Explore</NavLink>
            <NavLink className='about-me' exact to="/about">About</NavLink>
          </div>
          <NavLink id={!sessionUser ? 'drop-in' : 'drop-in-user'} exact to="/">Drop In</NavLink>
          <div className='demo-div'>
            {!sessionUser && demoUser && <DemoUser demoUser={demoUser}/>}
          </div>
          {isLoaded && sessionLinks}
        </li>
      </ul>
      <ul className='nav-ul second-nav'>
        <li className='navbar-container'>
          <div className='navbar-dropdown-img-div'>
            <img onClick={() => toggleSideNav()} className='navbar-dropdown-img' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/18E64E17-F182-4BE4-BC76-D69B29BF9EA6_4_5005_c.jpeg'/>
          </div>
          <ul className={sideNav ? 'sidenav-ul sidenav-ul-active' : 'sidenav-ul'}>
            <li className='sidenav-li'>
               <button className='hide-sidenav-btn' type="button"><img onClick={() => setSideNav(false)} className='sidenav-close' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/close.png' alt='x'/></button>
            </li>
            <li className='sidenav-li'>
                <NavLink onClick={() => setSideNav(false)} id='explore' exact to="/skateparks">Explore</NavLink>
            </li>
            <li className='sidenav-li'>
                <NavLink onClick={() => setSideNav(false)} className='about-me' exact to="/about">About</NavLink>
            </li>
            <li className='sidenav-li'>
                <a href='https://www.linkedin.com/in/jay-hutts-300ab9180/' onClick={() => setSideNav(false)} className='about-me' exact to="/about">LinkedIn</a>
            </li>
            <li className='sidenav-li'>
                <a href='https://github.com/jay-bean' onClick={() => setSideNav(false)} className='about-me' exact to="/about">Github</a>
            </li>
            <li className='sidenav-li'>
                {isLoaded && sessionLinks}
            </li>
          </ul>
          <NavLink id='drop-in' exact to="/">Drop In</NavLink>
          {!sessionUser && demoUser && <DemoUser demoUser={demoUser}/>}
        </li>
      </ul>
    </>
  );
}

export default Navigation;
