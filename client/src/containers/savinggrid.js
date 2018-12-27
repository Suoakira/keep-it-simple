import React, { Component } from 'react'
import '../App'
import SavingsData from "../savedata"
import SavingsCard from "../components/savingscard"
import { Redirect } from "react-router-dom"

class SavingsGird extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        const { username } = this.props
        return ( 
            username ?
            <div className = "wrapper" >
                <ul id="rig">
                    { SavingsData.map(data => <SavingsCard data={data} /> ) }
                </ul>
            </div>
            :
            <div>
            <Redirect
                to="/login" /> 
            </div>
         );
    }
}

export default SavingsGird