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

  state = {
    data: '',
    ingridient1: {id: '1', name: ''},
    ingridient2: {id: '2', name: ''},
    ingridient3: {id: '3', name: ''},
    ingridient4: {id: '4', name: ''},
    ingridient5: {id: '5', name: ''},
    ingridient6: {id: '6', name: ''},
  }
  
  onIngridientChange = (ev) => {
    // let {name, value} = ev.target;
    let value = ev.target.value;
    this.setState({
      ingridient1: {id: this.state.ingridient1.id, name: value},
    });
  }

  getFoodList = () => {
    fetch(`https://api.nal.usda.gov/fdc/v1/search?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH&generalSearchInput=${this.state.ingridient1.name}`)
    // fetch('https://api.nal.usda.gov/fdc/v1/559542?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH')
    .then(response => response.json())
    .then(data => {
        console.log(data)
        this.setState({
          ingridient1: {id: data.fdcId, name: this.state.ingridient1.name}, 
        }, console.log(this.state.ingridient1.name))
    });
    
  }

  foodSearch () {
    fetch(`https://api.nal.usda.gov/fdc/v1/search?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH&generalSearchInput=chips`)
    // fetch('https://api.nal.usda.gov/fdc/v1/559542?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH')
    .then(response => response.json())
    .then(data => {
        console.log(data)
    });
  }

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
        <div className="userInput">
          <input
              placeholder="Ingridient"
              value={this.state.ingridient1.name}
              onChange={this.onIngridientChange}
              name="test"
            /><button onclick={this.getFoodList}>Submit</button>
        </div>

      </div>
    );
  }
}

export default App;
