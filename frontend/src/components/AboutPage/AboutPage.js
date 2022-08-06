import './about.css';

function AboutPage() {
  return (
    <>
      <div className='first-buffer-about'></div>
      <div className='about-page'>
        <div className='second-buffer-about'>
          <p className='about-dropin'>About Drop In</p>
        </div>
        <div className='about-title-section'>
          <h1>We believe skating brings <span className='about-title-span'>people together</span></h1>
          <h2 className='about-title-h2'>Our mission is simple: <span className='about-title-span2'>to get as many people on wheels</span></h2>
        </div>
        <div className="about-me-container">
            <div className="about-me-img">
              <img className="about-me-img" src='https://avatars.githubusercontent.com/u/46910262?v=4' alt="jay"/>
            </div>
          <div className='about-me-link-div'>
            <h3 className="about-me-name">Jay Hutts</h3>
            <div>
              <a href="https://github.com/jay-bean"><img className='about-me-img-links' src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
              <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className='about-me-img-links' src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
            </div>
          </div>
          <div>
            <p className='about-me-p'>Drop In is an AllTrails clone. Instead of trails, it is based off of skateparks. I personally use AllTrails to locate and look up information on trails, and I thought 'this would be a cool idea for skateparks!', and so the idea was born. This is my second solo project I have completed so far. I have put a lot of time and care into this project and I am really proud of it. I hope you enjoy the site as well! </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default AboutPage;
