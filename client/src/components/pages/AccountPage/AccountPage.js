import React, { Component } from 'react';
import './AccountPage.css';
 
class AccountPage extends Component {

  // state = {
  //   userMeals: [],
  //   loggedinUser: '',
  // }

  componentDidMount() {
    this.props.getUser()
  }

  // mongo db woudl be db.usermeals.find({ user_id: this.state.loggedinUser })

  // saveMeal(meal) {
  // const formData = {
  //   user: this.state.loggedinUser,
  //   meal: meal,
  // }
  //   fetch('/api/mongodb/usermeals/', {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(formData),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Got this back', data);

  //       // Call method to refresh data
  //       this.fetchMeals();
  //     });
  //   }

  // onDelete(index){
  //   let recepies = this.state.recipes.slice();
  //   recepies.splice(index, 1);
  //   this.setState({
  //     loggedinUser: localStorage.getItem('user_id')
  //   }, this.fetchMeals(loggedinUser))
  // }

  // mongo db woudl be db.usermeals.find({ user_id: this.state.loggedinUser })

  // fetchMeals(loggedinUser) {
  //   console.log('Fetching data from API');
  //   fetch('/api/mongodb/usermeals/?user_id='+ loggedinUser) // query meals of specific user
  //   // fetch('/api/mongodb/usermeals/')
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Got data back', data);
  //       this.setState({
  //         userMeals: data,
  //       });
  //     });
  // }

  // saveMeal(meal) {
  // const formData = {
  //   user: this.state.loggedinUser,
  //   meal: meal,
  // }
  //   fetch('/api/mongodb/usermeals/', {
  //       method: 'POST',
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify(formData),
  //     })
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log('Got this back', data);

  //       // Call method to refresh data
  //       this.fetchMeals();
  //     });
  //   }

  // onDelete(index){
  //   let recepies = this.state.recipes.slice();
  //   recepies.splice(index, 1);
  //   this.setState({
  //     recipes : recepies,
  //   });
  //   console.log(index);
  // }


  render() {
    return (
      <div className="accountPageContainer">
        <div className= "accountPage-body">
          <h1>My Account</h1>
          <div className= "accountPage-mealSection">
            <p>Saved meals</p><p>Estimated Calorie Count</p>
            {
              this.props.userMeals.map((meal, index) => (
                <div>
                  <div className= "accountPage--recipeInfo">
                    {meal.meal}
                  </div>
                  <div className= "accountPage-calCount">
                    {meal.kcal}
                  </div>
                  <button onClick={() => this.onDelete(index)}>
                      Remove
                  </button>
                </div>
              ))
            }
        </div>
        </div>
        </div>
        
    );
  }
}

export default AccountPage;
