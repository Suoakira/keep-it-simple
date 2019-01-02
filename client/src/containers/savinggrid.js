import React, { Component } from 'react'
import '../App'
import SavingsData from "../savedata"
import SavingsCard from "../components/savingscard"
import { Redirect } from "react-router-dom"
import { Segment, Header } from 'semantic-ui-react';

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
                <Segment>
                    <Segment>
                        <Header size='large'>Create Savings Plan
                                <Header.Subheader>Pick a saving plan from the categorys below, or pick other to create your own.</Header.Subheader>
                        </Header>
                    </Segment>
               
                <ul id="rig">
                    <Segment>
                    { SavingsData.map(data => <SavingsCard data={data} /> ) }
                    </Segment>
                </ul>
                    </Segment>
                    <div className="historypad"></div>
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