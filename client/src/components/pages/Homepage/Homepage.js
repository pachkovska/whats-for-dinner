import React, { Component } from 'react';
import './Homepage.css';



class Homepage extends Component {
   render(){
       return (
        <div className="userInput">
            <input
                placeholder="Ingridient"
                value={this.props.currentIngridient}
                onChange={this.props.onIngridientChange}
            /><button onClick={this.props.getFoodList}>Submit</button> 
        </div>
       );
   }

}
export default Homepage;