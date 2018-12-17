import React, { Component } from 'react';
import Login from "./components/login"
import { Route, Switch, Link } from 'react-router-dom'
import Register from "./components/register"
import API from "./API"
import Navbar from "./components/navbar"




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }
  }

  signin = user => {
    this.setState({ username: user.username })
  }

  signout = () => {
    this.setState({ username: "" })
  }

  render() {
    const { signin } = this
    return (
      <div>
        <Navbar />
        <div className="main-banner">
          <img src="https://blog.dime.com/wp-content/uploads/2018/05/27-grow-your-savings.png" alt="" />
        </div>
        <Route path='/login' component={(props) => <Login {...props} signin={signin} />}/>
        <Route path='/register' component={(props) => <Register {...props} signin={signin} />} />

        {
          this.state.username ?
          <h1>logged in<button onClick={() => this.signout()}>Logout</button></h1>
          :
          <div class="ui large buttons">
              <button class="ui button"><Link to="/login">Login</Link></button>
            <div class="or"></div>
              <button class="ui button"><Link to="/register">Sign Up</Link></button>
          </div>
        }

    </div>

    )
  }
}

export default App;
