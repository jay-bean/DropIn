import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './profile.css';

function Profile() {
  const sessionUser = useSelector(state => state.session.user);

  return(
    sessionUser &&
      <div>
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
                <h2>Profile</h2>
              </div>
              <div className='profile-image-div'>

              </div>
            </div>

            <div className='profile-column-two'>
              <div className='contribute'>
                <h3>Contribute</h3>
                <p></p><Link className='profile-add-contribute' to='/skateparks/new'>Add a skatepark</Link>
              </div>
            </div>

          </div>
        </div>
        </div>
      </div>

  );
}

export default Profile;
