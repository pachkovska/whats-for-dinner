import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './Login';
import auth0Client from './Auth';

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Homepage from './components/pages/Homepage/Homepage.js';
import Blog from './components/pages/Blog/Blog.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';


class App extends Component {

  state = {
    current_ingridient: '',
    ingridients: [],
    nutrientData: [],
  }
  
  onIngridientChange = (ev) => {
    let value = ev.target.value;
    this.setState({
      current_ingridient: value,
    });
  }

  getFoodList = () => {
    console.log(this.state.current_ingridient)
    fetch(`https://api.nal.usda.gov/fdc/v1/search?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH&generalSearchInput=${this.state.current_ingridient}`)
    .then(response => response.json())
    .then(data => {
        this.setState({
          ingridients: [...this.state.ingridients, {id: data.foods[0].fdcId, name: this.state.current_ingridient}], 
        }, this.foodSearch(data.foods[0].fdcId))
    });
    
  }

  foodSearch (lastSavedIngridient) {
    fetch(`https://api.nal.usda.gov/fdc/v1/${lastSavedIngridient}?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH`)
    .then(response => response.json())
    .then(data => {
        this.setState({
          nutrientData: [...this.state.nutrientData, {id: lastSavedIngridient, foodNutrients: data.foodNutrients}],
        }, this.clearInputField())
    })
  }

  clearInputField() {
    this.setState({
      current_ingridient: '',
    })
  }
  
  render() {
    return (
      <div className="App">
         <nav className="App-navigation">
          {/* <h1 className="App-title">What's For Dinner</h1> */}
          <h1 className="App-title">DinnerCount</h1>
          <Link to="/">Welcome</Link>
          <Link to="/homepage">Home Page</Link>
          <Link to="/blog/">Blog</Link>
          <Link to="/write/">Write Article</Link>
            {/* <Link to={auth0Client.isAuthenticated() ? '/signout/' : '/login/'} component={LandingPage} > Signout  */}
            <Link to='/login/' component={Login}>Login </Link> 
            <Link to='/logout/' component={LandingPage} /> 
          {/* <Link to="/signuppage/">Signup</Link> */}


        </nav>

        <div className="App-mainContent">
          <Switch>
            <Route exact path='/' component={LandingPage} />
            <Route exact path='/homepage' component={Homepage} />
            <Route exact path='/blog/' component={Blog} />
            <Route exact path='/write/' component={WriteArticle} />
            <Route exact path='/login/' component={Login} /> 
            <Route exact path='/logout/' component={LandingPage} />
          </Switch>
        </div>
        <div className="userInput">
          <input
              placeholder="Ingridient"
              value={this.state.current_ingridient}
              onChange={this.onIngridientChange}
            /><button onClick={this.getFoodList}>Submit</button>
        </div>
        <button onClick={auth0Client.signOut}>Sign Out</button>
      </div>
    );
  }
}

export default App;
