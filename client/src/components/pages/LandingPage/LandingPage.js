import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './LandingPage.css';
class LandingPage extends Component {
  render() {
    return (
      <div className="LandingPage">
        <header className="LandingPage-header">
          <h1>
            What's For Dinner<br/>
            
          </h1>
          </header>
          <div className="link">
          <Link to="/homepage">Home Page</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/write/">Write Article</Link>
          <Link to="/signinpage/">Login</Link>
          <Link to="/signuppage/">Signup</Link>
          </div>

        {/* </header> */}
      </div>
    );
  }
}

export default LandingPage;
