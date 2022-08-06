import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getFavorites } from '../../store/favorite';
import { getReviews } from '../../store/review';
import { getSkateparks } from '../../store/skatepark';
import './profile.css';

function Profile() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews);
  const favorites = useSelector(state => state.favorites);

  let usersReviews;
  if (reviews && sessionUser) {
    usersReviews = Object.values(reviews).filter(review => review.userId === sessionUser.id)
  }

  let favoritesArr;
  if (favorites) {
    favoritesArr = Object.values(favorites);
  }

  useEffect(() => {
    dispatch(getReviews());
    dispatch(getFavorites());
    dispatch(getSkateparks());
  }, [dispatch]);

  return(
    sessionUser &&
     ( <div className='prof-page'>
        <div className='first-buffer'>
          <div className='first-buffer-flex'>
            <p>Member</p><p className='carrot'>{'>'}</p><p>{sessionUser.firstName} {sessionUser.lastName}</p>
          </div>
          </div>
          <div className='second-buffer'>
            <div className='second-buffer-flex'>
              <p>Profile</p>
              <p>Skateparks</p>
              <p>Favorites</p>
              <p>Reviews</p>
            </div>
          </div>
        <div className='profile-page-content'>
        <div className='profile-box'>
          <div className='profile-flex-container'>

            <div className='profile-column-one'>
              <div className='profile-container-header'>
                <div className='profile-container-header-flex'>
                  <h2 className='prof-headers'>Profile</h2><Link to='/profile/edit'><button className='profile-edit-btn'>Edit Profile</button></Link>
                </div>
              </div>
              <div className='profile-image-div'>
                <div className='image-flex-column'>
                  {sessionUser.picUrl ? <img className='profile-image' src={sessionUser.picUrl}/> : <img className='profile-image' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/73-730477_first-name-profile-image-placeholder-png.png'/>}
                  {!sessionUser.picUrl && <Link className='add-profile-photo' to='profile/edit'><i className="fa-solid fa-plus profile-img">Add photo</i></Link>}
                </div>
                <div className='profile-name-div'>
                  <h3 className='profile-name'>{sessionUser.firstName} {sessionUser.lastName}</h3>
                  <p className='profile-name-p'>{sessionUser.email}</p>
                </div>
              </div>

              <div className='profile-container-header second-containers'>
                <div className='profile-container-header-flex second-flex'>
                  <h2 className='prof-headers'>Reviews</h2>
                </div>
              </div>
              <div className='review-div'>
                <div className='review-flex-column'>
                  {usersReviews && usersReviews.length ? <><h4>You currently have {usersReviews.length} reviews.</h4><p> Head on over to the review tab if you would like to make any changes to them.</p></> : <p>You currently don't have any reviews.</p>}
                </div>
              </div>

              <div className='profile-container-header second-containers'>
                <div className='profile-container-header-flex second-flex'>
                  <h2 className='prof-headers'>Favorites</h2>
                </div>
              </div>
              <div className='review-div'>
                <div className='review-flex-column'>
                  {favoritesArr && favoritesArr.length ? <><h4>You have favorited {favoritesArr.length} skateparks!</h4><p> Head on over to the favorites tab if you would like to see which parks those are.</p></> : <p>You currently don't have any favorites. <Link className='profile-favorite-explore' to='/skateparks'>Explore</Link></p>}
                </div>
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

export default Profile;
