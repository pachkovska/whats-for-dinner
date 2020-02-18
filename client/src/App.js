import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Homepage from './components/pages/Homepage/Homepage.js';
import Blog from './components/pages/Blog/Blog.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';
import Signinpage from'./components/pages/Signinpage/Signinpage.js';
import Signuppage from'./components/pages/Signuppage/Signuppage.js';


class App extends Component {
  render() {
    return (
      <div className="App">
        <nav className="App-navigation">
          {/* <h1 className="App-title">What's For Dinner</h1> */}
          <Link to="/">Welcome</Link>
          <Link to="/homepage">Home Page</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/write/">Write Article</Link>
          <Link to="/signinpage/">Login</Link>
          <Link to="/signuppage/">Signup</Link>
          
          
        </nav>

        <div className="App-mainContent">
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/homepage' component={Homepage} />
            <Route exact path='/blog/' component={Blog} />
            <Route exact path='/write/' component={WriteArticle} />
            <Route exact path='/signinpage/' component={Signinpage} />
            <Route exact path='/signuppage/' component={Signuppage} />
            
          </Switch>
        </div>

      </div>
    );
  }
}

export default App;
