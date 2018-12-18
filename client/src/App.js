import React, { Component } from 'react';
import Login from "./components/login"
import { Route, Switch, Link } from 'react-router-dom'
import Register from "./components/register"
import API from "./API"
import Navbar from "./components/navbar"
import SavingGrid from "./containers/savinggrid"
import SavingsForm from "./components/savingsform"
import ExistingPlans from "./containers/existingplans"




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      username: "One Punch Man",
      tileClick: false,
      storedUserDetails: {
        "id": 1,
        "first_name": "Saitama",
        "last_name": "Saitama",
        "username": "One Punch Man",
        "email": "saitama@gmail.com",
        "image_url": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQw1KZLK5viY7t0B4SSpuRtkiz3FiZ6GBeO7c8IOA8rvuZCQ0yH",
        "bio": "You gotta train like hell until the point where your hair falls out. That’s the only way to become truly strong.",
        "facebook": "https://en-gb.facebook.com/OnePunchMan.GB/",
        "twitter": "https://twitter.com/hashtag/onepunchman?lang=en",
        "instagram": "https://www.instagram.com/one.punch.man/?hl=en",
        "created_at": "2018-12-18T17:50:24.254Z",
        "updated_at": "2018-12-18T17:50:24.254Z",
        "user_saving_targets": [
          {
            "id": 1,
            "user_id": 1,
            "saving_target_id": 1,
            "amount": 3270,
            "created_at": "2018-12-18T17:50:24.441Z",
            "updated_at": "2018-12-18T17:50:24.441Z"
          }
        ],
        "saving_targets": [
          {
            "id": 1,
            "name": "The Bahamas",
            "start_date": "2018-12-18T15:31:48.000Z",
            "end_date": "2019-12-18T15:31:48.000Z",
            "category": "Vacation",
            "target_image": "https://us-east.manta.joyent.com/condenast/public/cnt-services/production/2015/07/09/559e989d0121edec2570097a_bahamas-07-morning-life-Alessandro-Sarno.jpg",
            "plan": "personal",
            "created_at": "2018-12-18T17:50:24.407Z",
            "updated_at": "2018-12-18T17:50:24.407Z"
          },
          
        ]
      },
    }
  }

  toggleTileClick = () => {
    this.setState({tileClick: !this.state.tileClick })
  }

  signin = user => {
    this.setState({ 
      username: user.username,
      storedUserDetails: user
    
    })
  }

  signout = () => {
    this.setState({ username: "" })
  }


  render() {
    const { signin,toggleTileClick } = this
    const { storedUserDetails } = this.state
    return (
      <div>
        <Navbar />
        {/* <div className="main-banner">

              <img src="https://blog.dime.com/wp-content/uploads/2018/05/27-grow-your-savings.png" alt="" />

        </div> */}
        <Route exact path='/login' component={(props) => <Login signin={signin} />}/>
        <Route  exact path='/register' component={(props) => <Register signin={signin} />} />
        <Route exact path='/home/form' component={(props) => <SavingsForm signin={signin} />} />
        <Route exact path='/home/newplan' component={(props) => <SavingGrid signin={signin} />} />
        <Route exact path='/home/exisitingplans' component={(props) => <ExistingPlans  signin={signin} storedUserDetails={storedUserDetails}  />} />




    </div>


    )
  }
}

export default App;
