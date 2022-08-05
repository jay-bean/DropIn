import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './profile.css';

function Profile() {
  const sessionUser = useSelector(state => state.session.user);

  return(
    sessionUser &&
     ( <div>
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
      </div>)

  );
}

export default Profile;
