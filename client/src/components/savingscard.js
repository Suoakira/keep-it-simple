import React, { Component } from 'react';
import { Link } from "react-router-dom"

class SavingsCards extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { data } = this.props
        return ( 
            <Link exact to="/home/form">
                <li>
                <a className="rig-cell" href="#">
                        <img className="rig-img" src={data.imageUrl} alt="savings-image" /> 
                        <span className="rig-overlay"></span>
                        <span className="rig-text">
                            <h1 class="ui header">
                                {data.title}
                            </h1>
                        </span>
                    </a>
        
                </li>
            </Link>

     
         )
    }
}
 
export default SavingsCards