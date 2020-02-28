import React, { Component } from 'react';
import './AccountPage.css';
 
class AccountPage extends Component {

  componentDidMount() {
    this.props.getUser()
  }

  
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
                  {/* <button onClick={() => this.props.onDelete(index)}>
                      Remove
                  </button> */}
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
