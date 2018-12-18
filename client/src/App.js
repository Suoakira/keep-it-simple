import React, { Component } from 'react';
import Login from "./components/login"
import { Route, Switch, Link } from 'react-router-dom'
import Register from "./components/register"
import API from "./API"
import Navbar from "./components/navbar"
import SavingGrid from "./containers/savinggrid"
import SavingsForm from "./components/savingsform"




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      tileClick: false
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
        {/* <div className="main-banner">

              <img src="https://blog.dime.com/wp-content/uploads/2018/05/27-grow-your-savings.png" alt="" />

        </div> */}
        <Route exact path='/login' component={(props) => <Login {...props} signin={signin} />}/>
        <Route  exact path='/register' component={(props) => <Register {...props} signin={signin} />} />
        <Route exact path='/home/form' component={(props) => <SavingsForm {...props} signin={signin} />} />

        {
          this.state.username ?
          <SavingGrid />
          :
          null

        }


    </div>


    )
  }
}

export default App;
