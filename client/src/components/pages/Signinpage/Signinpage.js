import React, { Component } from 'react';
import './Signinpage.css';



class Signinpage extends Component{
    render(){
        return (
            <div className="Signinpage">
                <div className="">
                <h1>Please Sign In</h1>
                <form className="form-wrapper" onSubmit="{}" > 
                    <div classname="username"> 
                        <input classname="username"type="text" value = "" onChange="" placeholder="Username..."/> 
                    </div>
                    <br/>
                    <div className="password">
                        <input type="text" value = "" onChange="" placeholder="Password..."/> 
                    </div>
                    <br/>
                    <div className= "signinaccount">
                        <button className= "signin"type="submit" value ="signinaccount">Sign In</button>
                        <small>Forgot Password?</small>
                        

                    </div>
                </form>
                </div>
            </div>
             );
        }

}
export default Signinpage;