function AboutPage() {
  return (
    <div>
      <h1>hi</h1>
      <div className="user-id">
          <div className="user-img">
            <img className="user-card-img" src='https://avatars.githubusercontent.com/u/46910262?v=4' alt="jay"/>
          </div>
          <div className="user-name">
            <h3>Jay Hutts</h3>
          </div>
        </div>
        <div className="content-container about-me">
            <a href="https://github.com/jay-bean"><img className="user-card-img" src="https://t2marketinginternational.com/wp-content/uploads/2018/06/Github-Logo-450x450.png" alt="github logo"/></a>
            <a href="https://www.linkedin.com/in/jay-hutts-300ab9180/"><img className="user-card-img" src="https://www.maryville.edu/wp-content/uploads/2015/11/Linkedin-logo-1-550x550-300x300.png" alt="linked-in logo"/></a>
        </div>
    </div>
  );
}

export default AboutPage;
