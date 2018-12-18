import React, { Component } from 'react';
import { Link, NavLink } from "react-router-dom"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        
        <div className="ui inverted vertical masthead center aligned segment">
  
            <div className="ui container">
                <div className="ui large secondary inverted pointing menu">
                    <a className="toc item">
                        <i className="sidebar icon"></i>
                    </a>
                        <NavLink className="item" exact to="/home/newplan">
                            New Plan
                        </NavLink>
                        <NavLink className="item" exact to="/home/exisitingplans">
                            Exisiting Plans
                        </NavLink>

                    <div className="right item">
                            <Link className="ui inverted button" to="/login">
                               Log in
                            </Link>
                            <div className="or"></div>
                            <Link className="ui inverted button" to="/register">
                               Sign Up
                            </Link>

                    </div>
                </div>
            </div>
        </div>





    
                )
    }
}
 
export default Navbar;