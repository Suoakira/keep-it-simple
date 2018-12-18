import React, { Component } from 'react';
import { Link } from "react-router-dom"

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
        
        <div class="ui inverted vertical masthead center aligned segment">
  
            <div class="ui container">
                <div class="ui large secondary inverted pointing menu">
                    <a class="toc item">
                        <i class="sidebar icon"></i>
                    </a>
                    <a class="item">New Plan</a>
                    <a class="item">Existing Plans</a>

                    <div class="right item">
                            <Link to="/login">
                                <a class="ui inverted button">Log in</a>
                            </Link>
                            <div class="or"></div>
                            <Link to="/register">
                                <a class="ui inverted button">Sign Up</a>
                            </Link>

                    </div>
                </div>
            </div>
        </div>





    
                )
    }
}
 
export default Navbar;