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
          {/* <button className="btn btn-dark" onClick={this.props.signOut}>Sign Out</button> */}
      </div>
    );
  }
}

export default LandingPage;
