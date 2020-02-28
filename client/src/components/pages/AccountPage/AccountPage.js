import React, { Component } from 'react';
import './AccountPage.css';
 
class AccountPage extends Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <div className="accountPageContainer">
        <div className= "accountPage-body">
          <h1>My Account</h1>
          <div className= "accountPage-recipeSection">
            <div className= "accountPage-recipeSectionTitle">
            <p>Saved meals</p><p>Estimated Calorie Count</p>
            </div>
            {
              this.props.userMeals.map((meal, index) => (
                <div className= "accountPage--recipeSectionBody">
                  <div className= "accountPage--recipeInfo">
                    {meal.meal}
                  </div>
                  <div className= "accountPage-calCount">
                    {meal.kcal}
                  </div>

                  <button className= "accountPage-deleteBtn" onClick={() => this.props.onDelete(index)}>
                      Remove
                  </button>
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
