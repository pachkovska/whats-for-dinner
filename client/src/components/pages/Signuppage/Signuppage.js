import React, { Component } from 'react';
import './Signuppage.css';



class Signuppage extends Component{
    render(){
        return (
            <div className="Signuppage">
                <div className="">
                <h1>User Sign Up</h1>
                <form className="form-wrapper" onSubmit="{}" > 
                    <div classname="username"> 
                        {/* <label></label> */}
                        <input classname="username"type="text" value = "" onChange="" placeholder="Username..."/> 
                    </div>
                    <br/>
                    <div className="email">
                        {/* <label></label> */}
                        <input type="text" value = "" onChange="" placeholder="Email..."/> 
                    </div>
                    <br/>
                    <div className="password">
                        {/* <label></label> */}
                        <input type="text" value = "" onChange="" placeholder="Password..."/> 
                    </div>
                    <br/>
                    <div className="passwordcofirm">
                        {/* <label></label> */}
                        <input type="text" value = "" onChange="" placeholder="Password Confirm..."/>
                    </div> 
                    <br/>

                    <div className= "create">
                        <button className= "createaccount"type="submit" value ="Create Acctount">Create Account</button>
                        <small>Already Have a Account?Please</small>
                        <button className= "signin"type="submit" value ="Sign In">Login</button>

                    </div>
                </form>
                </div>
            </div>









            );
        }

}
export default Signuppage;