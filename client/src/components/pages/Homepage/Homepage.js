import React, { Component } from 'react';
import './Homepage.css';



class Homepage extends Component {
   render(){
       return (
        
        <div className="Homepage">

            <div className="div1">
                <h3>Please enter your Ingredients</h3>
                    <form className="search-form">
                        <input className="search-bar" placeholder ="Enter Ingedients" type ="text" value="" />
                        <button className="search-button" type= "submit">Add</button>
                    </form>
                    <br/>
                    <br/>
                    <br/>
              
                    <form className="search-form">
                        <input className="search-bar" placeholder ="Enter Ingedients" type ="text" value=""/>
                        <button className="search-button" type= "submit">Add</button>
                    </form>
                    <br/>
                    <br/>
                    <br/>
                    
                    <form className="search-form">
                        <input className="search-bar" placeholder ="Enter Ingedients" type ="text" value="" />
                        <button className="search-button" type= "submit">Add</button>
                    </form>
                    <br/>
               
                <button className="add-more-search-form" onClick="add-more" type="submit">+ Add more Ingedients</button>
            </div>
                
            <div className="list-of-calories">
                    <h3>Calories of ingredients</h3>
                        <div className="add-list">
                            <small>Calories:</small>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                
                        <div className="add-list">
                            <p>
                                <small>Calories:</small>
                            </p>
                        </div>
                        <br/>
                        <br/>
                        <br/>
                        
                        <div className="add-list">
                            <p>
                                <small>Calories:</small>
                            </p>
                        </div>
                        <br/>
                        <br/>
                    <div>
                            <strong>Total Calories:</strong>
                    </div>
                 
                <div className="save-calories">  
                   
                   <h3><button className="save"type="submit" value ="save-calories">Save Calories</button></h3>
                        
               </div>  
            
            
            </div>
        </div>
          
         
       );
   }

}
export default Homepage;