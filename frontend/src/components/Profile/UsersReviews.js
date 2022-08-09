import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getReviews } from '../../store/review';
import Review from '../Reviews/Review';
import Skatepark from '../Skateparks/Skatepark';
import './profile.css';

function UsersReviews() {
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  const reviews = useSelector(state => state.reviews);

  let usersReviews;
  if (reviews && sessionUser) {
    usersReviews = Object.values(reviews).filter(review => review.userId === sessionUser.id).reverse()
  }

  useEffect(() => {
    dispatch(getReviews());
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
              <Link className='profile-links' to='/profile/skateparks'>Skateparks</Link>
              <Link className='profile-links' to='/profile/favorites'>Favorites</Link>
              <Link className='profile-links active-prof-links' to='/profile/reviews'>Reviews</Link>
            </div>
          </div>
        <div className='profile-page-content'>
        <div className='profile-box'>
          <div className='profile-flex-container'>

            <div className='profile-column-one'>
              <div className='profile-container-header'>
                <div className='profile-container-header-flex'>
                  <h2 className='prof-headers'>Reviews</h2>
                </div>
              </div>
              <div className='all-container-profile'>
                <div className='review-flex-column'>
                  {usersReviews && usersReviews.length ? usersReviews.map(review => {
                    return (
                     review &&
                       <div key={review.id}>
                        <Skatepark skateparkId={review.skateparkId}/>
                        <Review review={review}/>
                      </div>
                    );
                  }) : null}
                </div>
              </div>
            </div>

            <div className='profile-column-two'>
              <div className='contribute'>
                <h3>Contribute</h3>
                  <Link className='add-park-contribute-flex' to='/skateparks/new'><p className='plus-sign'>+</p><p className='profile-add-contribute'>Add a skatepark</p></Link>
              </div>
              <div className='add-descriptor-div'>
                {usersReviews && usersReviews.length ? <p className='add-descriptor'>To your left is all of the reviews you have made. You can edit and delete your reviews from here. If you want to checkout the park you left the review on click the image for more details.</p> : <p className='add-descriptor'>You currently don't have any reviews. <Link className='profile-favorite-explore' to='/skateparks'>Explore</Link></p>}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>)

  );
}

export default UsersReviews;
