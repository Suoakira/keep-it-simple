import React, { Component } from 'react';
import Login from "./components/login"
import { Route, Switch, Link } from 'react-router-dom'
import { Register } from "./components/register"


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: ""
    }
  }

  signin = username => {
    this.setState({ username: username })
  }

  signout = () => {
    this.setState({ username: "" })
  }

  render() {
    const { signin } = this
    return (
      <div>

        {
          this.state.username ?
          <Login />
            :
          <Register />
        }
    </div>

    )
  }
}

export default App;
