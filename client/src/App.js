import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import Login from './Login';
import Callback from './components/Callback.js';
import auth0Client from './Auth.js';
import ReactModal from 'react-modal';
import logo from './images/calorize-logo.png';

import './App.css';
// import './components/pages/Homepage/Homepage.css';


import Homepage from './components/pages/Homepage/Homepage.js';
import AccountPage from './components/pages/AccountPage/AccountPage.js';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {

  state = {
    currentIngridient: '',
    currentIngridientAmount: '',
    ingridients: [],
    nutrientData: [],
    loggedinUser: '',
    userMeals: [],
    calorieCount: [],
    showModal: false,
    saved: '',
    showAccount: false,
  }
  

  getUser = () => {
    let loggedinUser = localStorage.getItem('user_id');
    this.setState({
      loggedinUser: loggedinUser,
    }, this.fetchMeals(loggedinUser))
  }

  onIngridientChange = (ev) => {
    let value = ev.target.value;
    this.setState({
      currentIngridient: value,
    });
  }

  onAmountChange = (ev) => {
    let value = ev.target.value;
    this.setState({
      currentIngridientAmount: value,
    });
  }

  getFoodList = () => {
    console.log('#1 get food list')
    const ingridient = this.state.currentIngridient;
    const amount = this.state.currentIngridientAmount;

    this.setState({
      currentIngridient: '',
      currentIngridientAmount: '',
    })

    fetch(`https://api.nal.usda.gov/fdc/v1/search?api_key=o5SMCYbasYSA5j3KyCNfq2DxrcMJZiQ1KHmhnnYH&generalSearchInput=${this.state.currentIngridient}`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
        const id = data.foods[0].fdcId;
        this.setState({
          ingridients: [...this.state.ingridients, {id: id, name: ingridient, calorieAmount: amount}], 
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
    let standardCalorieAmount = this.state.nutrientData.filter(el => el.id === lastSavedIngridient)[0].foodNutrients.filter(el => el.nutrient.unitName === 'kcal')[0].amount;
    let requestedCalorieAmount = Math.round(this.state.ingridients.filter(el => el.id === lastSavedIngridient)[0].calorieAmount*0.2835*standardCalorieAmount);
    let requestedOz = this.state.ingridients.filter(el => el.id === lastSavedIngridient)[0].calorieAmount;
    console.log("Last saved ingridient amount in grams", this.state.ingridients.filter(el => el.id === lastSavedIngridient)[0].calorieAmount);
    this.setState({
      calorieCount: [...this.state.calorieCount, { name: this.state.ingridients[this.state.ingridients.length - 1].name, kcal:  requestedCalorieAmount, amount: requestedOz}]
    })
  }

  fetchMeals(loggedinUser) {
    console.log('Fetching data from API');
    fetch(`/api/mongodb/usermeals/?user_id=${loggedinUser}`) // query meals of specific user
      .then(response => response.json())
      .then(data => {
        this.setState({
          userMeals: data,
        });
      });
  }

  saveMeal(meal) {
    const formData = {
      user_id: this.state.loggedinUser,
      meal: meal,
      kcal: this.state.calorieCount.reduce((totalCalories, element) => totalCalories + Number(element.kcal), 0),
      ingridients: this.state.calorieCount
    }
    console.log(formData)
    console.log('About to send the data to mongo')
      fetch('/api/mongodb/usermeals/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify(formData),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Got this back', data);
  
          // Call method to refresh data
          this.fetchMeals(formData.user_id);
        });
        this.setState({
          calorieCount: [],
        })
      }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }

  handleCloseModal = () => {
    const name = this.state.saved;
    console.log(name)
    this.setState({ showModal: false }, 
      () => {this.saveMeal(name)});
  }

  onMealNameChange = (ev) => {
    let value = ev.target.value;
    this.setState({
      saved: value,
    });
  }

  showAccount = () => {
    this.setState({
      showAccount: true,
    })
  }
  
  // onDelete(index){
  //   let recepies = this.state.userMeals.slice();
  //   recepies.splice(index, 1);
  //   this.setState({
  //     userMeals : recepies,
  //   });
  //  console.log(index);
  // }

  onDelete = (index) => {
    let documentId = this.state.userMeals[index]._id
    let loggedinUser = this.state.loggedinUser;
    console.log('users stuff to be fetched', loggedinUser)
    console.log('Document ID to be deleted', documentId)
    fetch('/api/mongodb/usermeals/?_id=' + documentId, {
      method: 'DELETE',
    })
    .then(response => response.json())
    .then(data => {
      console.log('Deleting items from DB', data);

      this.fetchMeals(loggedinUser);
      
    });
  }
  
  render() {
    
    return (
      <div className="App">
         <nav className="App-navigation">
           <div className="NavBar-left">
            <img className="LogoImage" src={logo} />
            <Link to="/"><p className="App-title">CalorieCache</p></Link>
          </div>
          <div className="NavBar-right">
          {
              this.state.showAccount 
              ? <Link className="NavBar-item" to="/account/">My Account</Link>
              : <Link className="NavBar-item" to='/login/' component={Login}>Login or Signup</Link>  
          }
          {
            this.state.showAccount &&  
            <Link className="NavBar-item" onClick={auth0Client.signOut} to='/logout/' component={Homepage}>Sign Out</Link>
          }
         </div>
        </nav>
        <div className="App-mainContent">
        <Switch>
            <Route exact path='/' render={props => 
              (<Homepage {...props} 
                currentIngridient={this.state.currentIngridient}
                currentIngridientAmount={this.state.currentIngridientAmount}
                onIngridientChange={this.onIngridientChange}
                onAmountChange={this.onAmountChange}
                getFoodList={this.getFoodList}
                calorieCount={this.state.calorieCount}
                showAccount={this.state.showAccount}
                handleOpenModal={this.handleOpenModal}
              />)
            } />
              <Route exact path='/account/' render={props => 
              (<AccountPage {...props} 
                getUser={this.getUser.bind(this)} //see if this will work without binding
                userMeals={this.state.userMeals}

                onDelete = {this.onDelete.bind(this)}
                // onDelete={this.onDelete}

                />)
              }/>
            <Route exact path='/login/' component={Login} />
            <Route exact path='/logout/' component={Homepage} />
            <Route exact path='/callback/'  render={props => 
              (<Callback {...props}
                onShowAccount={this.showAccount}
                getUser={this.getUser}
              />)
            }/>
          </Switch>  
            <ReactModal
                isOpen={this.state.showModal}
                style={customStyles}>  
                <p>Please enter name for your meal/recipe</p>              
                  <input style={{marginRight: '10px'}}
                  placeholder="Meal name"
                  value={this.state.saved}
                  onChange={this.onMealNameChange}
                />
                <button className="MainColor" onClick={this.handleCloseModal}>Save</button>  
            </ReactModal>
        </div>
          <footer>
            <p>Copyright &copy; CalorieCache 2020</p>
         </footer> 
      </div>
    );
  }
}

export default App;
