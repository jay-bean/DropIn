import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getFavorites } from '../../store/favorite';
import { getReviews } from '../../store/review';
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
  }, [dispatch]);

  return(
    sessionUser ?
     ( <div className='prof-page'>
        <div className='first-buffer'>
          <div className='first-buffer-flex'>
            <p>Member</p><p className='carrot'>{'>'}</p><p>{sessionUser.firstName} {sessionUser.lastName}</p>
          </div>
        </div>
          <div className='second-buffer'>
            <div className='second-buffer-flex'>
              <Link className={'profile-links active-prof-links'} to='/profile'>Profile</Link>
              <Link className={'profile-links'} to='/profile/skateparks'>Skateparks</Link>
              <Link className={'profile-links'} to='/profile/favorites'>Favorites</Link>
              <Link className={'profile-links'} to='/profile/reviews'>Reviews</Link>
            </div>
          </div>
        <div className='profile-page-content edit-profile-page-content'>
        <div className='profile-box'>
          <div className='profile-flex-container'>

            <div className='profile-column-one'>
              <div className='profile-container-header'>
                <div className='profile-container-header-flex'>
                  <h2 className='prof-headers'>Profile</h2><Link className='edit-btn-container' to='/profile/edit'><button className='profile-edit-btn'>Edit Profile</button></Link>
                </div>
              </div>
              <div className='profile-image-div'>
                <div className='image-name-container'>
                  <div className='image-con'>
                    {sessionUser.picUrl ? <img className='profile-image' src={sessionUser.picUrl}/> : <img className='profile-image' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/73-730477_first-name-profile-image-placeholder-png.png'/>}
                    {!sessionUser.picUrl && <Link className='add-profile-photo' to='profile/edit'><i className="fa-solid fa-plus profile-img">Add photo</i></Link>}
                  </div>
                  <div className='profile-name-div'>
                    <h3 className='profile-name'>{sessionUser.firstName} {sessionUser.lastName}</h3>
                    <p className='profile-name-p'>{sessionUser.email}</p>
                  </div>
                </div>
              </div>

              <div className='profile-container-header second-containers'>
                <div className='profile-container-header-flex second-flex'>
                  <h2 className='prof-headers'>Reviews</h2>
                </div>
              </div>
              <div className='review-div'>
                <div className='review-flex-column'>
                  {usersReviews && usersReviews.length ? <><h4 className='review-h4'>You currently have {usersReviews.length} reviews.</h4><p className='profile-p'> Head on over to your <Link className='profile-favorite-explore' to='/profile/reviews'>reviews</Link> tab if you would like to make any changes.</p></> : <p className='profile-p'>You currently don't have any reviews. <Link className='profile-favorite-explore' to='/skateparks'>Explore</Link></p>}
                </div>
              </div>

              <div className='profile-container-header second-containers'>
                <div className='profile-container-header-flex second-flex'>
                  <h2 className='prof-headers'>Favorites</h2>
                </div>
              </div>
              <div className='review-div'>
                <div className='review-flex-column'>
                  {favoritesArr && favoritesArr.length ? <><h4 className='review-h4'>You have favorited {favoritesArr.length} skateparks!</h4><p className='profile-p'> Head on over to your <Link className='profile-favorite-explore' to='/profile/favorites'>favorites</Link> tab if you would like to see which parks those are.</p></> : <p className='profile-p'>You currently don't have any favorites. <Link className='profile-favorite-explore' to='/skateparks'>Explore</Link></p>}
                </div>
              </div>
            </div>

            <div className='profile-column-two'>
              <div className='contribute'>
                <h3>Contribute</h3>
                  <Link className='add-park-contribute-flex' to='/skateparks/new'><p className='plus-sign'>+</p><p className='profile-add-contribute'>Add a skatepark</p></Link>
              </div>
              <div className='add-descriptor-div'>
                <p className='add-descriptor'>Welcome to Drop In! Thanks for being apart of the community {sessionUser.firstName}. Our goal is to help you find your next skatepark with ease. Now go out there and drop in!</p>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>) :  <Redirect to="/" />

  );
}

export default Profile;
