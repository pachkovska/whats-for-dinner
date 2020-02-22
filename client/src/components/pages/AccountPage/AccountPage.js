import React, { Component } from 'react';
import './AccountPage.css';

class AccountPage extends Component {
  state = {
    recipes: [
      ["pasta", "350"],
      ["Chicken Parm", "500"],
      ["Bologna Sandwich", "ew"],
    ]
  }

  onDelete(index){
    let recepies = this.state.recipes.slice();
    recepies.splice(index, 1);
    this.setState({
      recipes : recepies,
    });
    console.log(index);
  }


  render() {
    return (
      <div className="accountPageContainer">
        <div className= "accountPage-body">
        <h1>Welcome to your Account Page, [username]!</h1>
        <p> See below for your saved recepies. You can also delete them from this page as well.</p>
        </div>
        <div className= "accountPage-recipeSection">
          <div className= "accountPage--recipeNameSection">
          <div>Saved Recipe</div>
        {
              this.state.recipes.map((recipe, index) => ( 
                <div className= "accountPage--recipeInfo">
              {index+1}) {recipe[0]}
                </div>
              ))
            } 
        </div>
        <div className= "accountPage--calCountSection">
        <div>Total Calories</div>
        {
              this.state.recipes.map((recipe, index) => ( 
                <div className= "accountPage--recipeInfo">
                    {recipe[1]}
                </div>
              ))
            } 
        </div>
        <div className="accountPage--deleteButtonSection">
        <div></div>
        
      {
        this.state.recipes.map((recipe, index) => ( 
          <div>
              <button className="accountPage-deleteBtn" onClick={() => this.onDelete(index)}>
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
