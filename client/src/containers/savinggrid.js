import React, { Component } from 'react'
import '../App'
import SavingsData from "../savedata"
import SavingsCard from "../components/savingscard"

class SavingsGird extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div>
                <ul id="rig">
                    { SavingsData.map(data => <SavingsCard data={data} /> ) }
                </ul>
            </div>
         );
    }
}

export default SavingsGird