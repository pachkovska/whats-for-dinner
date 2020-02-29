import React, { Component } from 'react';
import './Homepage.css';
import TomatoImage from '../../../images/tomatoes-646645_1920.jpg';



class Homepage extends Component {
   render(){
       return (
        <div className="Homepage">
            <img className="TomatoImage" src={TomatoImage}/>
            <div className="Homepage-content">
                <p className="Homepage-slogan">We help our users be calorie-conscious</p>
                <p className="Homepage-title">Type in the name of an ingredient below and add it to your recipe.</p>
                <div className="IngridientList--display">
                    <div style={{marginBottom: '5px', fontWeight: 'bold', fontSize: '16px'}}>Ingredients:</div>
                    {/* <div>Calories per 100 grams:</div> */}
                    { this.props.calorieCount &&
                        this.props.calorieCount.map(singleIngridient => (
                            <div className="IngridientList-single">
                                <p className="IngridientList-single-name">{singleIngridient.name}</p>
                                <p className="IngridientList-single-amount">{singleIngridient.amount}</p>
                                <p className="IngridientList-single-calorie">{singleIngridient.kcal}</p>
                            </div>
                        ))
                    }
                    <div className="Ingridient-total" style={{fontWeight: 'bold'}}>
                        <p>Total Calories:</p>
                        <span>
                        {
                            this.props.calorieCount &&
                            this.props.calorieCount.reduce((totalCalories, element) => totalCalories + Number(element.kcal), 0)
                        }
                        </span> 
                    </div>
                    <div className="UserInput">
                        <input
                            className="IngridientInput"
                            placeholder="Ingridient"
                            value={this.props.currentIngridient}
                            onChange={this.props.onIngridientChange}
                        />
                        <input
                            className="AmountInput"
                            placeholder="Amount in OZ"
                            value={this.props.currentIngridientAmount}
                            onChange={this.props.onAmountChange}
                        />
                        <button className="IngridientAdd-btn" onClick={this.props.getFoodList}>Add</button> 
                    </div>
                    { this.props.showAccount &&
                        <button className="SaveMeal-btn" onClick={this.props.handleOpenModal}>Save current meal</button>
                    }
                </div>
            </div>
        </div>
       );
   }

}
export default Homepage;