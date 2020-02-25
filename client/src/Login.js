import React, { Component } from 'react';
// import logo from './dinner-count-logo.png';
import './App.css';
import auth0Client from './Auth';

class Login extends Component {
    componentDidMount() {
        if (!auth0Client.isAuthenticated()) {
            auth0Client.signIn();
        }
    }
    signOut = () => {
        auth0Client.signOut();
        this.props.history.replace('/');
    }
    render() {

        return (
            <div className="App" >
                <header className="App-header">
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    {
                        auth0Client.isAuthenticated() &&
                        <div>
                            <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
                            {/* <label className="mr-2 text-white">{auth0Client.handleAuthentication()}</label> */}
                            <br />
                            <button className="btn btn-dark" onClick={() => { this.signOut() }}>Sign Out</button>
                        </div>
                    }

                </header>
            </div>
        )
    }

}

export default Login;

// export function login(email, password, callback) {
//     const bcrypt = require('bcrypt');
//     const MongoClient = require('mongodb@3.1.4').MongoClient;
//     const client = new MongoClient('mongodb+srv://ksDbUser:FhkEzgSrQcksb0nS@cluster0-iqjc5.mongodb.net/test?retryWrites=true&w=majority');
  
//     client.connect(function (err) {
//       if (err) return callback(err);
  
//       const db = client.db('db-name');
//       const users = db.collection('users');
  
//       users.findOne({ email: email }, function (err, user) {
//         if (err || !user) {
//           client.close();
//           return callback(err || new WrongUsernameOrPasswordError(email));
//         }
  
//         bcrypt.compare(password, user.password, function (err, isValid) {
//           client.close();
  
//           if (err || !isValid) return callback(err || new WrongUsernameOrPasswordError(email));
  
//           return callback(null, {
//               user_id: user._id.toString(),
//               nickname: user.nickname,
//               email: user.email
//             });
//         });
//       });
//     });
//   }
