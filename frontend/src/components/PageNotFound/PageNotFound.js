import { Link } from 'react-router-dom';

import './page-not-found.css';

function PageNotFound() {
  return (
    <div className="page-not-found-container">
      <img className='page-not-found-img' src='https://drop-in-skate-bucket.s3.us-west-1.amazonaws.com/53289959-552C-48D6-934B-30791A5ADA2F.jpeg' alt='404 page'/>
      <div className='page-not-found-div'>
        <h1 className='h1-page-not-found'>404</h1>
        <h3 className='h3-page-not-found'>Looks like you 360'd a little too far.</h3>
        <Link className='link-page-not-found' to='/'><button className='link-page-not-found-btn'>Home</button></Link>
      </div>
    </div>
  );
}

export default PageNotFound;
