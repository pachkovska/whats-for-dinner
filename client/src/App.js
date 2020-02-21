import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom'

import './App.css';

import LandingPage from './components/pages/LandingPage/LandingPage.js';
import Homepage from './components/pages/Homepage/Homepage.js';
import AccountPage from './components/pages//AccountPage/AccountPage.js';
import Blog from './components/pages/Blog/Blog.js';
import WriteArticle from './components/pages/WriteArticle/WriteArticle.js';
import Signinpage from'./components/pages/Signinpage/Signinpage.js';
import Signuppage from'./components/pages/Signuppage/Signuppage.js';


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
          <Link to="/homepage">Home Page</Link>
          <Link to="/account">Account</Link>
        </nav>

        <div className="App-mainContent">
          <Switch>
            <Route exact path='/homepage' component={Homepage} />
            <Route exact path='/account' component={AccountPage} />
          </Switch>
        </div>
        <div className="userInput">
          <input
              placeholder="Ingridient"
              value={this.state.current_ingridient}
              onChange={this.onIngridientChange}
            /><button onClick={this.getFoodList}>Submit</button>
        </div>

      </div>
    );
  }
}

export default App;
