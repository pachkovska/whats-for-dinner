import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Callback from './components/Callback.js';
import auth0Client from './Auth.js';

import './App.css';


import Homepage from './components/pages/Homepage/Homepage.js';
import AccountPage from './components/pages/AccountPage/AccountPage.js';



class App extends Component {

  state = {
    currentIngridient: '',
    ingridients: [],
    nutrientData: [],
    loggedinUser: '',
    userMeals: [],
    calorieCount: []
  }
  

  getUser = () => {
    let loggedinUser = localStorage.getItem('user_id')
    this.setState({
      loggedinUser: loggedinUser
    }, this.fetchMeals(loggedinUser))
  }

  onIngridientChange = (ev) => {
    let value = ev.target.value;
    this.setState({
      currentIngridient: value,
    });
  }

  getFoodList = () => {
    console.log('#1 get food list')
    const ingridient = this.state.currentIngridient;

    this.setState({
      currentIngridient: '',
    })

    fetch(`https://api.nal.usda.gov/fdc/v1/search?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH&generalSearchInput=${this.state.currentIngridient}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
        const id = data.foods[0].fdcId;
        this.setState({
          ingridients: [...this.state.ingridients, {id: id, name: ingridient}], 
        }, () => {
          this.foodSearch(id);
        })
    }); 
  }

  foodSearch = (lastSavedIngridient) => {
    console.log('#2 food search')
    fetch(`https://api.nal.usda.gov/fdc/v1/${lastSavedIngridient}?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH`)
    .then(response => response.json())
    .then(data => {
      const newNutrientData = [...this.state.nutrientData, {id: lastSavedIngridient, foodNutrients: data.foodNutrients}]
      console.log("newNutrientData", newNutrientData)
        this.setState({
          nutrientData: newNutrientData,
        }, () => {
          this.getCalorieCount(lastSavedIngridient)
        })
    })
  }

  getCalorieCount = (lastSavedIngridient) => {
    console.log('#4 get calorie count')
    let calorieElement = this.state.nutrientData.filter(el => el.id === lastSavedIngridient)[0].foodNutrients.filter(el => el.nutrient.unitName === 'kcal')[0].amount;
    console.log(calorieElement)
    this.setState({
      calorieCount: [...this.state.calorieCount, { name: this.state.ingridients[this.state.ingridients.length - 1].name, kcal:  calorieElement}]
    })
  }

  fetchMeals(loggedinUser) {
    console.log('Fetching data from API');
    fetch(`/api/mongodb/usermeals/?user_id=${loggedinUser}`) // query meals of specific user
      .then(response => response.json())
      .then(data => {
        console.log('Got data back', data);
        this.setState({
          userMeals: data,
        });
      });
  }

  saveMeal(meal) {
    const formData = {
      user: this.state.loggedinUser,
      meal: meal,
    }
      fetch('/api/mongodb/usermeals/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Got this back', data);
  
          // Call method to refresh data
          this.fetchMeals(formData.user);
        });
      }

  // onDelete(index){
  //   let userRecipes = this.state.userRecipes.slice();
  //   userRecipes.splice(index, 1);
  //   this.setState({
  //     userRecipes : userRecipes,
  //   });
  // }
  
  render() {
    
    return (
      <div className="App">
         <nav className="App-navigation">
          {/* <h1 className="App-title">What's For Dinner</h1> */}
          <Link to="/"><h1 className="App-title">Dine&Cashe</h1></Link>
         {/* { this.state.loggedinUser === ''  */}
           <Link to="/account/">My Account</Link> 
          <Link to='/login/' component={Login}>Login or Signup</Link> 
            {/* <Link to={auth0Client.isAuthenticated() ? '/signout/' : '/login/'} component={LandingPage} > Signout  */}
           
            <Link to='/logout/' component={Homepage} /> 
          {/* <Link to="/signuppage/">Signup</Link> */}
        </nav>

        <div className="App-mainContent">
          <Switch>
            <Route exact path='/' render={props => 
              (<Homepage {...props} 
                currentIngridient={this.state.currentIngridient}
                onIngridientChange={this.onIngridientChange}
                getFoodList={this.getFoodList}
                calorieCount={this.state.calorieCount}
              />)
            } />
            <Route exact path='/account' render={props => 
             (<AccountPage {...props} 
              getUser={this.getUser.bind(this)} //see if this will work without binding
              userMeals={this.state.userMeals}
              // onDelete = {this.onDelete.bind(this)}
              />)
              }/> 
            {/* { this.state.loggedinUser != '' && <Route exact path='/account/' component={AccountPage} />  } */}
            {/* { !this.state.loggedinUser && <Route exact path='/login/' component={Login} /> } */}
            <Route exact path='/login/' component={Login} />
            <Route exact path='/logout/' component={Homepage} />
            <Route exact path='/callback/' component={Callback} />
          </Switch>
        </div>
        <button onClick={auth0Client.signOut}>Sign Out</button>
        <div>
              <button onClick={this.getCalorieCount.bind(this)}>Calories</button>
        </div>
      </div>
    );
  }
}

export default App;
