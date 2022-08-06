import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
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
    usersSkateparks = Object.values(skateparks).filter(skatepark => skatepark.userId === sessionUser.id);
  }

  useEffect(() => {
    dispatch(getSkateparks());
  }, [dispatch]);

  return (
    sessionUser &&
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
                 <h2 className='prof-headers'>Skateparks</h2><Link to='/skateparks/new'><button className='profile-edit-btn'>Add Skatepark</button></Link>
               </div>
             </div>
             <div className='skatepark-container-profile'>
              {usersSkateparks && usersSkateparks.length && usersSkateparks.map(skatepark => {
                return (
                  <Skatepark skatepark={skatepark}/>
                );
              })}
             </div>
           </div>

           <div className='profile-column-two'>
             <div className='contribute'>
               <h3>Contribute</h3>
                 <Link className='add-park-contribute-flex' to='/skateparks/new'><p className='plus-sign'>+</p><p className='profile-add-contribute'>Add a skatepark</p></Link>
             </div>
           </div>

         </div>
       </div>
       </div>
     </div>)

  );
}

export default UsersSkateparks;