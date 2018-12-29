import React, { Component } from 'react'
import { Redirect } from "react-router-dom"

class PlanHistory extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { username } = this.props
        return ( 
        username ?
        <div>
            <p>Place Holder fancy stats page</p>
        </div>
        :
        <div>
            <Redirect
                to="/login" />
        </div>
        
        )
    }
}
 
export default PlanHistory;