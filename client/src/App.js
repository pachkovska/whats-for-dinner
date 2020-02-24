import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './Login';
import auth0Client from './Auth';

import './App.css';


import Homepage from './components/pages/Homepage/Homepage.js';
import AccountPage from './components/pages//AccountPage/AccountPage.js';



class App extends Component {

  state = {
    current_ingridient: '',
    ingridients: [],
    nutrientData: [],
    userRecipes: [
    ["pasta", "350"],
    ["Chicken Parm", "500"],
    ["Bologna Sandwich", "ew"],
    ["Crab Rangoon", "650"],
    ],
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

  onDelete(index){
    let userRecipes = this.state.userRecipes.slice();
    userRecipes.splice(index, 1);
    this.setState({
      userRecipes : userRecipes,
    });
  }
  
  render() {
    return (
      <div className="App">
         <nav className="App-navigation">
          {/* <h1 className="App-title">What's For Dinner</h1> */}
          <Link to="/"><h1 className="App-title">Dine&Cashe</h1></Link>
          <Link to="/account">My Recipes</Link>
            {/* <Link to={auth0Client.isAuthenticated() ? '/signout/' : '/login/'} component={LandingPage} > Signout  */}
            <Link to='/login/' component={Login}>Login </Link> 
            <Link to='/logout/' component={Homepage} /> 
          {/* <Link to="/signuppage/">Signup</Link> */}
        </nav>

        <div className="App-mainContent">
          <Switch>
            <Route exact path='/' component={Homepage} />
            <Route exact path='/account' render={props => 
             (<AccountPage {...props} 
              userRecipes = {this.state.userRecipes}
              onDelete = {this.onDelete.bind(this)}
              />)
              }/> 
            <Route exact path='/login/' component={Login} /> 
            <Route exact path='/logout/' component={Homepage} />
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
