import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import chef from '../../../images/chef-1816252_1920.jpg';
import './AccountPage.css';
 
class AccountPage extends Component {

  componentDidMount() {
    this.props.getUser()
  }

  render() {
    return (
      <div className="accountPageContainer">
        <div className= "accountPage-body">
          <h1>My Recipes</h1>
          <p>View and remove your currently saved recipes below.</p>
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

              ))
            }
          </div>
        </div>
        {/* <button className="accountPageAddMore-btn" onClick={() => this.props.addMoreRecipes}>
            Add more recipes
        </button> */}
        <Link className="accountPageAddMore-btn" to="/"><p className="accountPageAddMore-btn--text">Add more recipes</p></Link>
    </div>
        
    );
  }
}

export default AccountPage;
