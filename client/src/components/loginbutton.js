import React from 'react'
import { Link } from 'react-router-dom'

const Loginbutton = () => {
    return (
    
    
    
    <div class="ui one column stackable center aligned page grid">
        <div class="column six wide">
            <div class="ui large buttons">
                <Link to="/login">
                    <button class="ui button">Login </button>
                </Link>
                <div class="or"></div>
                <Link to="/register">
                    <button class="ui button">SignUp</button>
                </Link>
            </div>
        </div>
    </div> 
    )
}
 
export default Loginbutton;