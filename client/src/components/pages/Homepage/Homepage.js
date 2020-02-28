import React, { Component } from 'react';
import './Homepage.css';



class Homepage extends Component {
   render(){
       return (
        <div className="IngridientList--display">
            <div>Ingridients:</div>
            {/* <div>Calories per 100 grams:</div> */}
            { this.props.calorieCount &&
                this.props.calorieCount.map(singleIngridient => (
                    <div className="IngridentList-single">
                        <p>{singleIngridient.name}</p>
                        <p>{singleIngridient.kcal}</p>
                    </div>
                ))
            }
            <div className="userInput">
                <input
                    placeholder="Ingridient"
                    value={this.props.currentIngridient}
                    onChange={this.props.onIngridientChange}
                /><button className="MainColor" onClick={this.props.getFoodList}>Add</button> 
            </div>
            <div className="">
                <p>Total:</p>
                <span>
                {
                    this.props.calorieCount &&
                    this.props.calorieCount.reduce((totalCalories, element) => totalCalories + Number(element.kcal), 0)
                }
                </span> 
            </div>
        </div>
       );
   }

}
export default Homepage;