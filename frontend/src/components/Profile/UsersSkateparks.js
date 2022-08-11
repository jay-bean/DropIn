import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getSkateparks } from '../../store/skatepark';
import Skatepark from '../Skateparks/Skatepark';
import './profile.css';
import './usersskateparks.css';

function UsersSkateparks() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const skateparks = useSelector(state => state.skateparks);

  let usersSkateparks;
  if (skateparks && sessionUser) {
    usersSkateparks = Object.values(skateparks).filter(skatepark => skatepark.userId === sessionUser.id).reverse();
  }

  useEffect(() => {
    dispatch(getSkateparks());
  }, [dispatch]);

  return (
    sessionUser ?
    ( <div className='prof-page'>
       <div className='first-buffer'>
         <div className='first-buffer-flex'>
           <p>Member</p><p className='carrot'>{'>'}</p><p>{sessionUser.firstName} {sessionUser.lastName}</p>
         </div>
         </div>
         <div className='second-buffer'>
           <div className='second-buffer-flex'>
             <Link className='profile-links' to='/profile'>Profile</Link>
             <Link className='profile-links active-prof-links' to='/profile/skateparks'>Skateparks</Link>
             <Link className='profile-links' to='/profile/favorites'>Favorites</Link>
             <Link className='profile-links' to='/profile/reviews'>Reviews</Link>
           </div>
         </div>
       <div className='profile-page-content'>
       <div className='profile-box'>
         <div className='profile-flex-container'>

           <div className='profile-column-one'>
             <div className='profile-container-header'>
               <div className='profile-container-header-flex'>
                 <h2 className='prof-headers'>Skateparks</h2>
               </div>
             </div>
             <div className='all-container-profile'>
              {usersSkateparks && usersSkateparks.length ? usersSkateparks.map(skatepark => {
                return (
                  <Skatepark key={skatepark.id} skatepark={skatepark}/>
                );
              }) : null}
             </div>
           </div>

           <div className='profile-column-two'>
             <div className='contribute'>
               <h3>Contribute</h3>
                 <Link className='add-park-contribute-flex' to='/skateparks/new'><p className='plus-sign'>+</p><p className='profile-add-contribute'>Add a skatepark</p></Link>
             </div>
             <div className='add-descriptor-div'>
              {usersSkateparks && usersSkateparks.length ? <p className='add-descriptor'>Here you can view all of the skateparks you have contributed to the site so far. Click on any of them to view, edit, or delete.</p> : <p className='add-descriptor'>You currently haven't added a skatepark to the site. If you have one in mind that you don't see click the link above!</p>}
             </div>
           </div>

         </div>
       </div>
       </div>
     </div>) : <Redirect to="/" />

  );
}

export default UsersSkateparks;
